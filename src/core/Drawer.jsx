import React from 'react';
import { BlazeComponent } from 'blazereact';

export default class Drawer extends BlazeComponent {
    constructor(props) {
        super(props)
        this.canvas = null;
        this.scaling = 10;
        this.frameCount=0;
        let r = [];
        for (var y = 0; y < props.ySize; y++) {
            for (var x = 0; x < props.xSize; x++) {
                if (!r[y]) {
                    r[y] = [];
                }

                r[y][x] = 0;
            }
        }
        this.display=r;

        this.colorStore={
            1:"#444",
        }
    }

    data() {
        return { display: null };
    }

    regColor(code,color){
        this.colorStore[code]=color;
    }

    onFrame(){
        this.props.onFrame&&this.props.onFrame(this.frameCount++);
        requestAnimationFrame(()=>{this.onFrame()});
        for(var y in this.display){
            for(var x in this.display[y]){
                let code=this.display[y][x]
                if(this.display[y][x]==0){
                    this.ctx.fillStyle="#fff";
                    this.ctx.fillRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);

                    this.ctx.strokeStyle="#eee";
                    this.ctx.strokeRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);
                }
                let color=this.colorStore[code];
                if(color){
                    this.ctx.fillStyle=color;
                    this.ctx.fillRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);
                }
            }
        }
    }

    componentDidMount(){
        this.ctx=this.canvas.getContext("2d");
        requestAnimationFrame(()=>{this.onFrame()});
    }

    setBlock(x, y, type) {
        if(!type){
            this.display[y][x]=1;
        }
        else{
            this.display[y][x]=type;
        }
    }

    delBlock(x, y) {
        this.display[y][x]=0;
    }

    clearAll() {
        this.frameCount=0;
        let r = [];

        for (var y = 0; y < this.props.ySize; y++) {
            for (var x = 0; x < this.props.xSize; x++) {
                if (!r[y]) {
                    r[y] = [];
                }

                r[y][x] = 0;
            }
        }

        this.display = r;
    }
    render() {
        return (
            <div style={{ width: "100%" }} {...this.props}>
                <canvas 
                ref={instance => { this.canvas = instance }} 
                width={this.props.xSize * this.scaling} 
                height={this.props.ySize * this.scaling} 
                style={{ border: "1px solid #000" }}></canvas>
            </div>)
    }
}
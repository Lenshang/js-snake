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
    }

    data() {
        return { display: null };
    }

    onFrame(){
        this.props.onFrame&&this.props.onFrame(this.frameCount++);
        requestAnimationFrame(()=>{this.onFrame()});
        for(var y in this.display){
            for(var x in this.display[y]){
                if(this.display[y][x]==0){
                    this.ctx.fillStyle="#fff";
                    this.ctx.fillRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);

                    this.ctx.strokeStyle="#eee";
                    this.ctx.strokeRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);
                }
                else if(this.display[y][x]==1){
                    this.ctx.fillStyle="#444";
                    this.ctx.fillRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling);
                }
            }
        }
    }

    componentDidMount(){
        this.ctx=this.canvas.getContext("2d");
        requestAnimationFrame(()=>{this.onFrame()});
    }

    setBlock(x, y, color) {
        this.display[y][x]=1;
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

    getXItem = (yItem) => {
        return yItem.map(xItem => {
            return (<td style={{ width: 12, height: 12, backgroundColor: xItem == 1 ? "white" : "black" }}></td>)
        })
    }
    getYItem = () => {
        return this.$data.display.map(yItem => {
            return (<tr>{this.getXItem(yItem)}</tr>)
        });
    }
    render() {
        return (
            <div style={{ width: "100%" }} {...this.props}>
                <canvas ref={instance => { this.canvas = instance }} width={this.props.xSize * this.scaling} height={this.props.ySize * this.scaling} style={{ border: "1px solid #000" }}></canvas>
                {/* <table border={1} rules="none" style={{margin:"auto"}}>
                {this.getYItem()}
            </table> */}

            </div>)
    }
}
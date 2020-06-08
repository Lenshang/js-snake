import React from 'react';
import {BlazeComponent} from 'blazereact';

export default class Drawer extends BlazeComponent{
    constructor(props){
        super(props)
    }
    
    data(){
        let r=[];

        for(var y=0;y<this.props.ySize;y++){
            for(var x=0;x<this.props.xSize;x++){
                if(!r[y]){
                    r[y]=[];
                }

                r[y][x]=0;
            }
        }

        return {
            display:r
        };
    }

    setBlock(x,y){
        this.$data.display[y][x]=1
    }

    delBlock(x,y){
        this.$data.display[y][x]=0
    }

    clearAll(){
        let r=[];

        for(var y=0;y<this.props.ySize;y++){
            for(var x=0;x<this.props.xSize;x++){
                if(!r[y]){
                    r[y]=[];
                }

                r[y][x]=0;
            }
        }

        this.$data.display=r;
    }

    getXItem=(yItem)=>{
        return yItem.map(xItem=>{
            return (<td style={{width:20,height:20,backgroundColor:xItem==1?"black":null}}></td>)
        })
    }
    getYItem=()=>{
        return this.$data.display.map(yItem=>{
            return (<tr>{this.getXItem(yItem)}</tr>)
        });
    }
    render(){
        return (
        <div style={{width:"100%"}}>
            <table border={1} rules="none" style={{margin:"auto"}}>
                {this.getYItem()}
            </table>
        </div>)
    }
}
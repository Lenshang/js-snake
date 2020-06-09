import React from 'react';
import { BlazeComponent } from 'blazereact';
import Drawer from './core/Drawer';

export default class extends BlazeComponent {
    drawer;
    constructor(props) {
        super(props);
        this.direction = "right";
        this.bugPosition = [-1, -1]
        this.snakes = [];
        this.xSize = 20;
        this.ySize = 15;
        this.score = 0;

        this.nextDirection="";
    }
    data() {
        return {
            skipFrames:5,
            running: false,
            tips: "Snake Game"
        }
    }
    getRandom(x, y) {
        //x 下限 
        //y 上限
        return parseInt(Math.random() * (y - x + 1) + x);
    }

    getNewBugs(){
        let x=this.getRandom(0, this.xSize - 1);
        let y=this.getRandom(0, this.ySize - 1);
        for (let index in this.snakes) {
            let sn = this.snakes[index];
            if (x == sn[0] && y == sn[1]) {
                return this.getNewBugs();
            }
        }

        return [x,y]
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => {
            switch (e.key) {
                case "w": case "W":
                    if (this.direction != "down") {
                        this.nextDirection = "up";
                    }
                    break;
                case "a": case "A":
                    if (this.direction != "right") {
                        this.nextDirection = "left";
                    }
                    break;
                case "s": case "S":
                    if (this.direction != "up") {
                        this.nextDirection = "down";
                    }
                    break;
                case "d": case "D":
                    if (this.direction != "left") {
                        this.nextDirection = "right";
                    }

                    break;
            }
            console.log(this.direction)
        })
        // setInterval(() => {
        //     if (this.$data.running) {
        //         this.onFrame();
        //     }
        // }, this.$data.interval);
    }

    checkGameover(nextStep) {
        if (nextStep[0] < 0 ||
            nextStep[0] >= this.xSize ||
            nextStep[1] < 0 ||
            nextStep[1] >= this.ySize) {
            return true;
        }
        for (let index in this.snakes) {
            let sn = this.snakes[index];
            if (nextStep[0] == sn[0] && nextStep[1] == sn[1]) {
                return true;
            }
        }

        return false
    }

    onFrame(frames) {
        if(!this.$data.running){
            return;
        }
        if(frames%(1+this.$data.skipFrames)!=0){
            return;
        }
        if (this.bugPosition[0] == -1) {
            this.score = 0;
            // this.bugPosition[0] = this.getRandom(0, this.xSize - 1);
            // this.bugPosition[1] = this.getRandom(0, this.ySize - 1);
            this.bugPosition=this.getNewBugs();
            this.snakes.push([5, 5]);
        }

        if(this.nextDirection){
            this.direction=this.nextDirection;
        }
        let nextStep = [];
        switch (this.direction) {
            case "left":
                nextStep = [this.snakes[0][0] - 1, this.snakes[0][1]]
                break;
            case "right":
                nextStep = [this.snakes[0][0] + 1, this.snakes[0][1]]
                break;
            case "up":
                nextStep = [this.snakes[0][0], this.snakes[0][1] - 1]
                break;
            case "down":
                nextStep = [this.snakes[0][0], this.snakes[0][1] + 1]
                break;
        }
        if (this.checkGameover(nextStep)) {
            //GameOver
            this.$data.running = false;
            this.direction = "right";
            this.bugPosition = [-1, -1]
            this.snakes = [];
            this.score = 0;
            this.nextDirection="";
            this.drawer.clearAll();
            this.$data.tips = "Game Over!";
            return;
        }

        this.snakes.unshift(nextStep);

        //判断是否吃到虫子
        if (nextStep[0] == this.bugPosition[0] && nextStep[1] == this.bugPosition[1]) {
            this.bugPosition=this.getNewBugs();
            this.score += 1;
        }
        else {
            var _s=this.snakes.pop();
            this.drawer.delBlock(_s[0],_s[1]);
        }

        //Draw
        //this.drawer.clearAll();
        this.snakes.forEach(sn => {
            this.drawer.setBlock(sn[0], sn[1]);
        })
        this.drawer.setBlock(this.bugPosition[0], this.bugPosition[1]);

        this.$data.tips = "Score:" + this.score;
    }
    render() {
        return (
            <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
                <h1>Snake Game</h1>
                <div>{this.$data.tips}</div>
                {this.$data.running?null:(<button onClick={() => { this.$data.running = true }}>start</button>)}
                <Drawer onFrame={frames=>{this.onFrame(frames)}} style={{marginTop:20}} ref={instance => { this.drawer = instance }} xSize={this.xSize} ySize={this.ySize}></Drawer>
            </div>
        )
    }
}
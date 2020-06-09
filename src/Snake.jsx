import React from 'react';
import { BlazeComponent } from 'blazereact';
import Drawer from './core/Drawer';

export default class extends BlazeComponent {
    drawer;
    constructor(props) {
        super(props);
        this.player1 = {
            direction: "right",
            nextDirection: "",
            score: 0,
            footprint: [],
            snakes: []
        }
        this.player2 = {
            direction: "right",
            nextDirection: "",
            score: 0,
            footprint: [],
            snakes: []
        }
        //this.direction = "right";
        //this.score = 0;
        //this.footprint=[];
        //this.snakes = [];

        this.bugPosition = [-1, -1]

        this.xSize = 40;
        this.ySize = 30;


        this.nextDirection = "";
    }
    data() {
        return {
            skipFrames: 5,
            running: false,
            tips: "Press Button TO Start!",
            imgMode:false
        }
    }
    getRandom(x, y) {
        //x 下限 
        //y 上限
        return parseInt(Math.random() * (y - x + 1) + x);
    }

    getNewBugs() {
        let x = this.getRandom(0, this.xSize - 1);
        let y = this.getRandom(0, this.ySize - 1);
        for (let index in this.snakes) {
            let sn = this.snakes[index];
            if (x == sn[0] && y == sn[1]) {
                return this.getNewBugs();
            }
        }

        return [x, y]
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => {
            switch (e.key) {
                case "w": case "W":
                    if (this.player1.direction != "down") {
                        this.player1.nextDirection = "up";
                    }
                    break;
                case "a": case "A":
                    if (this.player1.direction != "right") {
                        this.player1.nextDirection = "left";
                    }
                    break;
                case "s": case "S":
                    if (this.player1.direction != "up") {
                        this.player1.nextDirection = "down";
                    }
                    break;
                case "d": case "D":
                    if (this.player1.direction != "left") {
                        this.player1.nextDirection = "right";
                    }
                    break;
                case "i": case "I":
                    if (this.player2.direction != "down") {
                        this.player2.nextDirection = "up";
                    }
                    break;
                case "j": case "J":
                    if (this.player2.direction != "right") {
                        this.player2.nextDirection = "left";
                    }
                    break;
                case "k": case "K":
                    if (this.player2.direction != "up") {
                        this.player2.nextDirection = "down";
                    }
                    break;
                case "l": case "L":
                    if (this.player2.direction != "left") {
                        this.player2.nextDirection = "right";
                    }
                    break;
            }
            //console.log(this.direction)
        })

        this.drawer.regColor(2, "#f44");

        this.drawer.regColor(21, "#fee");

        this.drawer.regColor(3, "#44f");

        this.drawer.regColor(31, "#eef");


        let img=new Image(120,120);
        img.src="http://kagamine.cn/snake/k/right.png"
        this.drawer.regColor(25,img);
        
        let img2=new Image(120,120);
        img2.src="http://kagamine.cn/snake/k/left.png"
        this.drawer.regColor(26,img2);

        img=new Image(120,120);
        img.src="http://kagamine.cn/snake/k/right2.png"
        this.drawer.regColor(35,img);
        
        img2=new Image(120,120);
        img2.src="http://kagamine.cn/snake/k/left2.png"
        this.drawer.regColor(36,img2);
        // setInterval(() => {
        //     if (this.$data.running) {
        //         this.onFrame();
        //     }
        // }, this.$data.interval);
    }

    checkGameover(nextStep, snakePlayer) {
        if (nextStep[0] < 0 ||
            nextStep[0] >= this.xSize ||
            nextStep[1] < 0 ||
            nextStep[1] >= this.ySize) {
            return true;
        }
        for (let index in this.player1.snakes) {
            let sn = this.player1.snakes[index];
            if (nextStep[0] == sn[0] && nextStep[1] == sn[1]) {
                return true;
            }
        }

        for (let index in this.player2.snakes) {
            let sn = this.player2.snakes[index];
            if (nextStep[0] == sn[0] && nextStep[1] == sn[1]) {
                return true;
            }
        }

        return false
    }

    onFrame(frames) {
        if (!this.$data.running) {
            return;
        }
        if (frames % (1 + this.$data.skipFrames) != 0) {
            return;
        }
        if (this.bugPosition[0] == -1) {
            this.score = 0;
            // this.bugPosition[0] = this.getRandom(0, this.xSize - 1);
            // this.bugPosition[1] = this.getRandom(0, this.ySize - 1);
            this.bugPosition = this.getNewBugs();

            //this.snakes.push([5, 5]);
            this.player1.snakes = [];
            this.player1.footprint = [];
            this.player1.score = 0;
            this.player1.nextDirection = "";
            this.player1.direction = "right";
            this.player1.snakes.push([5, 5]);
            this.player1.snakes.push([4, 5]);
            this.player2.snakes = [];
            this.player2.footprint = [];
            this.player2.score = 0;
            this.player2.nextDirection = "";

            if (this.player2.direction) {
                this.player2.direction = "right";
                this.player2.snakes.push([5, 10]);
                this.player2.snakes.push([4, 10]);
            }
        }

        if (this.player1.nextDirection) {
            this.player1.direction = this.player1.nextDirection;
        }

        if (this.player2.nextDirection) {
            this.player2.direction = this.player2.nextDirection;
        }

        //#region Player1
        let nextStep = [];
        switch (this.player1.direction) {
            case "left":
                nextStep = [this.player1.snakes[0][0] - 1, this.player1.snakes[0][1]]
                break;
            case "right":
                nextStep = [this.player1.snakes[0][0] + 1, this.player1.snakes[0][1]]
                break;
            case "up":
                nextStep = [this.player1.snakes[0][0], this.player1.snakes[0][1] - 1]
                break;
            case "down":
                nextStep = [this.player1.snakes[0][0], this.player1.snakes[0][1] + 1]
                break;
        }
        if (this.checkGameover(nextStep)) {
            //GameOver
            this.$data.running = false;
            this.bugPosition = [-1, -1]
            this.drawer.clearAll();
            this.$data.tips = "2P WIN!";
            return;
        }


        this.player1.snakes.unshift(nextStep);

        //判断是否吃到虫子
        if (nextStep[0] == this.bugPosition[0] && nextStep[1] == this.bugPosition[1]) {
            this.bugPosition = this.getNewBugs();
            this.player1.score += 1;
        }
        else {
            var _s = this.player1.snakes.pop();
            this.player1.footprint.push({
                addFrame: frames,
                x: _s[0],
                y: _s[1]
            })
            this.drawer.delBlock(_s[0], _s[1]);
        }
        //#endregion

        //#region Player2
        let nextStep2 = [];
        if (this.player2.direction) {
            switch (this.player2.direction) {
                case "left":
                    nextStep2 = [this.player2.snakes[0][0] - 1, this.player2.snakes[0][1]]
                    break;
                case "right":
                    nextStep2 = [this.player2.snakes[0][0] + 1, this.player2.snakes[0][1]]
                    break;
                case "up":
                    nextStep2 = [this.player2.snakes[0][0], this.player2.snakes[0][1] - 1]
                    break;
                case "down":
                    nextStep2 = [this.player2.snakes[0][0], this.player2.snakes[0][1] + 1]
                    break;
            }
            if (this.checkGameover(nextStep2)) {
                //GameOver
                this.$data.running = false;
                this.bugPosition = [-1, -1]
                this.drawer.clearAll();
                this.$data.tips = "1P WIN!";
                return;
            }


            this.player2.snakes.unshift(nextStep2);

            //判断是否吃到虫子
            if (nextStep2[0] == this.bugPosition[0] && nextStep2[1] == this.bugPosition[1]) {
                this.bugPosition = this.getNewBugs();
                this.player2.score += 1;
            }
            else {
                var _s = this.player2.snakes.pop();
                this.player2.footprint.push({
                    addFrame: frames,
                    x: _s[0],
                    y: _s[1]
                })
                this.drawer.delBlock(_s[0], _s[1]);
            }
        }
        //#endregion

        //Draw P1 Footprint
        this.player1.footprint.forEach(item => {
            if ((frames - item.addFrame) > 500) {
                this.drawer.delBlock(item.x, item.y);
            }
            else {
                this.drawer.setBlock(item.x, item.y, 21);
            }
        })

        //Draw P2 Footprint
        this.player2.footprint.forEach(item => {
            if ((frames - item.addFrame) > 500) {
                this.drawer.delBlock(item.x, item.y);
            }
            else {
                this.drawer.setBlock(item.x, item.y, 31);
            }
        })

        //Draw P1 Snake
        this.player1.snakes.forEach((sn, index) => {
            if (index == 0) {
                if(this.$data.imgMode){
                    if(this.player1.direction=="left"){
                        this.drawer.setBlock(sn[0], sn[1], 26);
                    }
                    else{
                        this.drawer.setBlock(sn[0], sn[1], 25);
                    }
                }
                else{
                    this.drawer.setBlock(sn[0], sn[1], 2);
                }
            }
            else {
                this.drawer.setBlock(sn[0], sn[1]);
            }
        })

        //Draw P2 Snake
        this.player2.snakes.forEach((sn, index) => {
            if (index == 0) {
                if(this.$data.imgMode){
                    if(this.player2.direction=="left"){
                        this.drawer.setBlock(sn[0], sn[1], 36);
                    }
                    else{
                        this.drawer.setBlock(sn[0], sn[1], 35);
                    }
                }
                else{
                    this.drawer.setBlock(sn[0], sn[1], 3);
                }
            }
            else {
                this.drawer.setBlock(sn[0], sn[1]);
            }
        })

        this.drawer.setBlock(this.bugPosition[0], this.bugPosition[1]);

        this.$data.tips = "Score1:" + this.player1.score + " Score2:" + this.player2.score;
    }
    render() {
        return (
            <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
                <h1>Snake Game</h1>
                <div>by LenShang</div>
                <div>git:<a href="https://github.com/Lenshang/js-snake" target="blank">https://github.com/Lenshang/js-snake</a></div>
                <div style={{marginTop:10}}>{this.$data.tips}</div>
                {this.$data.running ? null : (
                    <div>
                        <button onClick={() => { this.$data.running = true; this.player2.direction = "" }}>start 1p</button>
                        <button onClick={() => { this.$data.running = true; this.player2.direction = "right" }}>start 2p</button>
                    </div>
                )}
                <a style={{fontSize:5,color:"#cccccc"}} href="javascript:void(0)" onClick={() => { this.$data.imgMode = !this.$data.imgMode }}>dont Click me</a>
                <Drawer onFrame={frames => { this.onFrame(frames) }} style={{ marginTop: 20 }} ref={instance => { this.drawer = instance }} xSize={this.xSize} ySize={this.ySize}></Drawer>
            </div>
        )
    }
}
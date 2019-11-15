import * as PIXI from 'pixi.js';

export default class Block {

    COLOR = {
        GREEN: "0x32a852",
        BLUE: "0x2a8bc7",
        RED: "0xc92b22"
    }

    WIDTH = 70;
    HEIGHT = 20;

    constructor(x, y) {

        let colors = Object.keys(this.COLOR);
        this.render = new PIXI.Graphics();
        this.render.position.set(x-this.WIDTH/2, y);
		this.render.beginFill(this.COLOR[colors[this.RandInt(0, colors.length-1)]], 1);
		this.render.drawRoundedRect(0, 0, this.WIDTH, this.HEIGHT, 5);
        this.render.endFill();

        this.isAlive = true;
        this.lives = 3;
    }

    update() {
        if(this.lives === 0) {
            this.isAlive = false;
            this.render.destroy();
        }
    }

    BallColliding(circle) {
        var distX = Math.abs(circle.x - this.render.position.x-this.render.width/2);
        var distY = Math.abs(circle.y - this.render.position.y-this.render.height/2);
    
        if (distX > (this.render.width/2 + circle.width/2)) { return false; }
        if (distY > (this.render.height/2 + circle.width/2)) { return false; }
    
        if (distX <= (this.render.width/2)) {
            circle.dy = -circle.dy;
            return true;
        } 
        if (distY <= (this.render.height/2)) {
            circle.dx = -circle.dx;
            return true;
        }
    
        var dx=distX-this.render.width/2;
        var dy=distY-this.render.height/2;
        if(dx*dx+dy*dy<=(Math.pow(circle.width/2, 2))) {
            circle.dy = -circle.dy;
            circle.dx = -circle.dx;
            return true;
        };
    }

    RandInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}
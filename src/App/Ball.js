import * as PIXI from 'pixi.js';

export default class Ball extends PIXI.Sprite {
    constructor(texture) {
        super(texture);
        
        this.scale.set(0.15);
        this.anchor.set(0.5);

        this.dx = 3;
        this.dy = 3;
        this.angle = -2;

        this.index = 0;
		this.textures = Object.keys(PIXI.utils.TextureCache);
    }

    start() {

    }

    update(deltatime, container) {
        // TOP
        if( this.y - this.width/2 < 0) this.dy = -this.dy;
        // LEFT
        if( this.x - this.width/2 < 0) this.dx =-this.dx;
        // RIGHT
        if( this.x + this.width/2 > container.width) this.dx =-this.dx;
        // BOTTOM
        if( this.y + this.width/2 > container.height) this.dy = -this.dy; //this.restart();

        this.x += (Math.sin(this.ator(this.angle))) * (deltatime * this.dx);
        this.y += (Math.cos(this.ator(this.angle))) * (deltatime * this.dy);
    }

    change() {
        this.texture = PIXI.utils.TextureCache[this.textures[this.index]];
        this.textures[this.index + 1] ? this.index++ : this.index = 0;
    }

    restart() {

    }

    ator(angle) {
        return angle * Math.PI/180; //Angle in Radians
    }
}
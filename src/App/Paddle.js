import * as PIXI from 'pixi.js';

export default class Paddle extends PIXI.Sprite {
    constructor(texture) {
		super(texture);
		this.scale.set(0.25);
		this.anchor.set(0.5);

        this.controls = {
			up: false,
			left: false,
			right: false,
			down: false
		};

		this.keyDownHandler = this.keyDownHandler.bind(this);
		window.addEventListener("keydown", this.keyDownHandler, false);

		this.keyUpHandler = this.keyUpHandler.bind(this);
		window.addEventListener("keyup", this.keyUpHandler, false);
	}

	update(deltatime) {
		/*
		if(this.controls.up) (this.velocity.y < -5) ? this.velocity.y = -5 : this.velocity.y -= .3;
		else if(!this.controls.down) (this.velocity.y >= 0) ? this.velocity.y = 0 : this.velocity.y += .3;
			
		if(this.controls.down) (this.velocity.y > 5) ? this.velocity.y = 5 : this.velocity.y += .3;
		else if(!this.controls.up) (this.velocity.y <= 0) ? this.velocity.y = 0 : this.velocity.y -= .3;
		*/
		if(this.controls.left)	this.position.x -= 3 * deltatime;
		if(this.controls.right)	this.position.x += 3 * deltatime;
	}

	BallColliding(circle) {
        var distX = Math.abs(circle.x - this.position.x-this.width/2);
        var distY = Math.abs(circle.y - this.position.y-this.height/2);
    
        if (distX > (this.width/2 + circle.width/2)) { return false; }
        if (distY > (this.height/2 + circle.width/2)) { return false; }
    
        if (distX <= (this.width/2)) {
            circle.dy = -circle.dy;
            return true;
        } 
        if (distY <= (this.height/2)) {
            circle.dx = -circle.dx;
            return true;
        }
    
        var dx=distX-this.width/2;
        var dy=distY-this.height/2;
        if(dx*dx+dy*dy<=(Math.pow(circle.width/2, 2))) {
            circle.dy = -circle.dy;
            circle.dx = -circle.dx;
            return true;
        };
    }

    keyDownHandler(event) {
		if(event.keyCode === 90) {
			this.controls.up = true;
		}
		if(event.keyCode === 83) {
			this.controls.down = true;
		}
		if(event.keyCode === 81) {
			this.controls.left = true;
		}
		if(event.keyCode === 68) {
			this.controls.right = true;
		}
	}

	keyUpHandler(event) {
		if(event.keyCode === 90) {
			this.controls.up = false
		}
		if(event.keyCode === 83) {
			this.controls.down = false
		}
		if(event.keyCode === 81) {
			this.controls.left = false
		}
		if(event.keyCode === 68) {
			this.controls.right = false
		}
	}
    
    umount() {
		window.removeEventListener('keydown', this.keyDownHandler);
		window.removeEventListener('keyup', this.keyUpHandler);
    }
}
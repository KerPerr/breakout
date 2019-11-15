import React from 'react';
import * as PIXI from 'pixi.js';

// BO
import Paddle	from './Paddle';
import Ball		from './Ball';
import Block	from './Block';

import poke from './Assets/Paddle.svg';
// POKEMON
//import pika from './Assets/Pikachu.svg';
//import miaw from './Assets/Miaous.svg';
import bulb from './Assets/Bulbizare.svg';
import cara from './Assets/Carapuce.svg';
import sala from './Assets/Salameche.svg';

export default class App extends React.Component {

	Enemies = [];

	constructor() {
		super();

		this.loop = this.loop.bind(this);
		this.setup = this.setup.bind(this);
		this.initPlayer = this.initPlayer.bind(this);
		this.initEnemies = this.initEnemies.bind(this);

		this.resize = this.resize.bind(this);
		window.addEventListener("resize", this.resize, false);
	}

	componentDidMount() {
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight
		});
		this.app.renderer.autoResize = true;

		this.app.loader
		.add([poke, cara, sala, bulb])
		//.on('progress', (loader, resource) => { console.log(loader.progress + '%'); })
		.load(this.setup);

		this.mount.appendChild(this.app.view);
		this.resize();
	}

	loop(delta) {
		this.Enemies.forEach(element => {
			if(element.isAlive && element.BallColliding(this.ball)) {
				element.lives--;
				element.update();
			}
		});
		this.paddle.update(delta);
		this.ball.update(delta, this.app.renderer);

		if(this.paddle.BallColliding(this.ball)) {
			console.log('BOOM');
		}
	}

	setup() {
		this.app.stage = new PIXI.Container(0xFFFFFF);

		this.initPlayer();
		this.initEnemies();

		this.app.ticker.add(dt => this.loop(dt));
	}

	initPlayer() {
		this.paddle = new Paddle(PIXI.utils.TextureCache[poke]);
		this.paddle.position.set(this.app.renderer.width/2, this.app.renderer.height-150);

		this.ball = new Ball(PIXI.utils.TextureCache[bulb]);
		this.ball.position.set(this.app.renderer.width/2, this.app.renderer.height/2);
		
		this.app.stage.addChild(this.paddle, this.ball);
	}

	initEnemies() {
		let e = new Block(this.mount.clientWidth/2-100, 100);
		this.Enemies.push(e);
		this.app.stage.addChild(e.render);
	}

	resize() {
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
		this.paddle.umount();
		this.app.stop();
	}

	render() {
		return <div ref={ref => (this.mount = ref)} />;
	}
}
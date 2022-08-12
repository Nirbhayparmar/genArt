const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [1080, 1080],
	animate: true,
};
function ColorByTime() {
	let color = "#000000";
	let date = new Date();
	let seconds = date.getSeconds();
	let str = new String(seconds);
	let ran = Math.floor(random.range(1, 6.9));
	let char;
	if (ran == 1) {
		char = "F";
	}
	if (ran == 2) {
		char = "E";
	}
	if (ran == 3) {
		char = "D";
	}
	if (ran == 4) {
		char = "C";
	}
	if (ran == 5) {
		char = "B";
	}
	if (ran == 6) {
		char = "A";
	}
	if (str.length == 1) {
		// let ran = Math.floor(random.range(1, 6.9));
		if (ran == 1) {
			str += "A";
		}
		if (ran == 2) {
			str += "B";
		}
		if (ran == 3) {
			str += "C";
		}
		if (ran == 4) {
			str += "D";
		}
		if (ran == 5) {
			str += "E";
		}
		if (ran == 6) {
			str += "F";
		}
	}
	color = `#${char}${str}${char}${str}`;
	//console.log(color);
	return color;
}

const sketch = ({ context, width, height }) => {
	const agents = [];
	for (let i = 0; i < 50; i++) {
		let x = random.range(0, width);
		let y = random.range(0, height);
		agents.push(new agent(x, y));
	}

	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);
		context.strokeStyle = ColorByTime();
		for (let i = 0; i < agents.length; i++) {
			const first = agents[i];
			for (let j = i + 1; j < agents.length; j++) {
				const second = agents[j];
				const distance = first.pos.getDistance(second.pos);
				if (distance > 200) {
					continue;
				}
				context.lineWidth = math.mapRange(distance, 0, 200, 12, 1);
				context.beginPath();
				context.moveTo(first.pos.x, first.pos.y);
				context.lineTo(second.pos.x, second.pos.y);

				context.stroke();
			}
		}
		agents.forEach((agent) => {
			agent.updateLocation();
			agent.draw(context);
			agent.bounce(width, height);
		});
	};
};
class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	getDistance(other) {
		let dx = this.x - other.x;
		let dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}
class agent {
	constructor(x, y) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
		this.radious = random.range(5, 15);
	}

	updateLocation() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
	bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= width) {
			this.vel.x *= -1;
		}
		if (this.pos.y <= 0 || this.pos.y >= height) {
			this.vel.y *= -1;
		}
	}
	draw(context) {
		// context.fillStyle = "black";
		context.save();
		context.lineWidth = 4;
		context.translate(this.pos.x, this.pos.y);
		context.beginPath();
		context.arc(0, 0, this.radious, 0, Math.PI * 2);
		context.fill();
		context.stroke();
		context.restore();
	}
}
canvasSketch(sketch, settings);

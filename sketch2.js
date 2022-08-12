const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
let length = 1080;
const settings = {
	dimensions: [length, length],
	//animate: true,
};

const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		const cx = width * 0.5;
		const cy = height * 0.5;
		const w = width * 0.01;
		const h = height * 0.1;
		const num = 36;
		const division = 360 / num;
		const radious = width * 0.3;
		let x, y;
		for (let i = 0; i < num; i++) {
			let angle = math.degToRad(division * i);
			let slice = math.degToRad(division);
			x = cx + radious * Math.sin(angle);
			y = cy + radious * Math.cos(angle);
			context.save();
			// context.strokeStyle = ColorByTime();
			context.translate(x, y);
			context.rotate(-angle);
			//context.scale(random.range(1, 2), random.range(1, 3));
			//context.fillStyle = ColorByTime();
			context.beginPath();
			context.rect(
				-w * 0.5,
				-h * 0.5,
				w * random.range(1, 2),
				h * random.range(1, 3)
			);
			context.fill();
			context.restore();

			context.save();
			context.translate(cx, cy);
			context.lineWidth = random.range(5, 10);
			context.beginPath();
			context.rotate(angle);
			context.arc(
				0,
				0,
				radious * random.range(0.5, 1),
				-slice * random.range(1, 4),
				slice * random.range(2, 5)
			);
			//context.strokeStyle = ColorByTime();
			context.stroke();
			context.restore();
		}
	};
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
canvasSketch(sketch, settings);

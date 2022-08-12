const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
let length = 1080;
const settings = {
	dimensions: [length, length],
};
//for quater visible circle
const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		// const cx = width * 0.5;
		// const cy = height * 0.5;
		const cx = 0;
		const cy = 0;
		const w = width * 0.01;
		const h = height * 0.1;
		const num = 36;
		const division = 360 / num;
		const radious = width * 0.5;
		let x, y;
		for (let i = 0; i < num; i++) {
			let angle = math.degToRad(division * i);
			let slice = math.degToRad(division);
			x = cx + radious * Math.sin(angle);
			y = cy + radious * Math.cos(angle);
			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			//context.scale(random.range(1, 2), random.range(1, 3));
			context.fillStyle = "black";
			context.beginPath();
			context.rect(
				-w * 0.5,
				-h * 0.5,
				w * random.range(1, 2),
				h * random.range(1, 5)
			);
			context.fill();
			context.restore();

			context.save();
			context.translate(cx, cy);
			context.lineWidth = random.range(5, 15);
			context.beginPath();
			context.rotate(angle);
			context.arc(
				0,
				0,
				radious * random.range(0.5, 1),
				-slice * random.range(1, 5),
				slice * random.range(2, 5)
			);
			context.stroke();
			context.restore();
		}
	};
};

canvasSketch(sketch, settings);

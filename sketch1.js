const canvasSketch = require("canvas-sketch");
let length = 1080;
const settings = {
	dimensions: [length, length],
};

const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = "black";
		context.strokeStyle = "white";
		context.fillRect(0, 0, width, height);

		const w = width * 0.1;
		const h = height * 0.1;
		const gap = width * 0.03;
		const ix = width * 0.17;
		const iy = height * 0.17;
		const off = width * 0.035;

		let x, y;
		for (let i = 0; i < 5; i++) {
			x = ix + (w + gap) * i;
			for (let j = 0; j < 5; j++) {
				y = iy + (h + gap) * j;
				context.beginPath();
				context.rect(x, y, w, h);
				context.stroke();
				if (i == 2 || j == 2) {
					context.beginPath();
					context.rect(x + off / 2, y + off / 2, w - off, h - off);
					context.stroke();
				}
			}
		}
	};
};

canvasSketch(sketch, settings);

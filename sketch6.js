const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [1080, 1080],
	animate: true,
};

const sketch = () => {
	return ({ context, width, height, frame }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		const cols = 15;
		const rows = 15;
		const numCells = cols * rows;

		const gridw = width * 0.8;
		const gridh = height * 0.8;
		const cellw = gridw / cols;
		const cellh = gridh / rows;
		const margx = (width - gridw) * 0.5;
		const margy = (height - gridh) * 0.5;

		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);
			const x = col * cellw;
			const y = row * cellh;
			const w = cellw * 0.8;
			const h = cellh * 0.8;
			const n = random.noise2D(x + frame * 15, y, 0.001);
			const angle = n * Math.PI * 0.2;
			context.save();
			context.translate(x, y);
			context.translate(margx, margy);
			context.translate(cellw * 0.5, cellh * 0.5);
			context.rotate(angle);
			context.lineWidth = math.mapRange(n, -1, 1, 1, 7);
			context.beginPath();
			context.moveTo(-0.5 * w, 0);
			context.lineTo(0.5 * w, 0);
			// context.moveTo(0, -0.5 * h);
			// context.lineTo(0, 0.5 * h);

			context.stroke();
			context.restore();
			// outer borders,just for looking;
			context.save();
			context.translate(margx, margy);
			context.rect(x, y, cellw, cellh);
			context.stroke();
			context.restore();
		}
	};
};

canvasSketch(sketch, settings);

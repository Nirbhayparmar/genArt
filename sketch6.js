const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
import { Pane } from "tweakpane";
const settings = {
	dimensions: [1080, 1080],
	animate: true,
};
const params = {
	cols: 10,
	rows: 10,
	scaleMin: 1,
	scaleMax: 5,
	amplitude: 0.2,
	frequency: 0.001,
	animate: true,
	frame: 0,
	Noise2d: true,
	linecap: "butt",
};

const sketch = () => {
	return ({ context, width, height, frame }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		const cols = params.cols;
		const rows = params.rows;
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
			const f = params.animate ? frame : params.frame;
			const n = params.Noise2d
				? random.noise2D(x + f * 15, y, params.frequency)
				: random.noise3D(x, y, f * 15, params.frequency);
			const angle = n * Math.PI * params.amplitude;
			context.save();
			context.translate(x, y);
			context.translate(margx, margy);
			context.translate(cellw * 0.5, cellh * 0.5);
			context.rotate(angle);
			context.lineWidth = math.mapRange(
				n,
				-1,
				1,
				params.scaleMin,
				params.scaleMax
			);
			context.lineCap = params.linecap;
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
function createPane() {
	const pane = new Pane();
	const f1 = pane.addFolder({
		title: "grid",
	});
	const f2 = pane.addFolder({
		title: "noise",
	});
	const f3 = pane.addFolder({
		title: "animateOrNot",
	});
	f1.addInput(params, "cols", {
		min: 2,
		max: 100,
		step: 1,
	});
	f1.addInput(params, "rows", {
		min: 2,
		max: 100,
		step: 1,
	});
	f1.addInput(params, "linecap", {
		options: {
			butt: "butt",
			round: "round",
			square: "square",
		},
	});
	f1.addInput(params, "scaleMin", {
		min: 1,
		max: 5,
		step: 0.5,
	});
	f1.addInput(params, "scaleMax", {
		min: 6,
		max: 20,
		step: 0.5,
	});
	f2.addInput(params, "amplitude", {
		min: 0.1,
		max: 1,
		step: 0.01,
	});
	f2.addInput(params, "frequency", {
		min: -0.005,
		max: 0.005,
		step: 0.0001,
	});
	f2.addInput(params, "Noise2d");
	f3.addInput(params, "animate");
	f3.addInput(params, "frame", {
		min: 0,
		max: 999,
		step: 1,
	});
}

canvasSketch(sketch, settings);
createPane();

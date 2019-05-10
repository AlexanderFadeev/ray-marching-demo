import Vector from "../../../common/Vector.mjs";
import Line from "./Line.mjs";
import Circle from "./Circle.mjs";

export default class AppModel {
    constructor() {
        this.shapes = [];
        this.lightSource = null;
    }

    addCircle() {
        this.addShape(this.makeRandomCircle());
    }

    makeRandomCircle() {
        const r = 0.05 + 0.05*Math.random();
        const x = r + (1 - 2 * r)*Math.random();
        const y = r + (1 - 2 * r)*Math.random();
        const c = new Vector(x, y);
        return new Circle(c, r);
    }

    addShape(shape) {
        this.shapes.push(shape);
    }
}
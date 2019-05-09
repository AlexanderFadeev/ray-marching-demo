import Shape from "./Shape.mjs";

export default class Circle extends Shape {
    constructor(center, radius) {
        super();
        this.center = center;
        this.radius = radius;
    }

    distanceTo(point) {
        return point.clone.sub(this.center).length - this.radius;
    }
}
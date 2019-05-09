import Shape from "./Shape.mjs";

export default class Line extends Shape {
    constructor(a, b) {
        super();
        this.a = a.clone;
        this.b = b.clone;
        this.d = this.b.clone.sub(this.a);
    }

    distanceTo(point) {
        const d1 = point.clone.sub(this.a);
        const d2 = point.clone.sub(this.b);

        if (this._isAcuteAngleBetweenVectors(this.d, d1) && this._isAcuteAngleBetweenVectors(this.d.clone.negate(), d2)) {
            return this.d.clone.normalize().vectorProductLength(d1);
        } else {
            return Math.min(d1.length, d2.length);
        }
    }

    _isAcuteAngleBetweenVectors(a, b) {
        const a2 = Math.pow(a.length, 2);
        const b2 = Math.pow(b.length, 2);
        const c = a.clone.sub(b);
        const c2 = Math.pow(c.length, 2);
        return a2 + b2  > c2;
    }
}
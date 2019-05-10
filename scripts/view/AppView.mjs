import Vector from "/common/Vector.mjs";
import Mouse from "/common/Mouse.mjs";

export default class AppView {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d", {alpha: false});
        this.mouse = new Mouse(this.canvas, new Vector(1, 1));

        window.addEventListener("resize", this.onResize.bind(this));
        this.onResize();
    }

    onResize() {
        this.canvas.style.width = "100%";
        let d = this.canvas.clientWidth;
        if (d > window.innerHeight) {
            d = window.innerHeight;
        }
        this.canvas.style.height = `${d}px`;
        this.canvas.style.width = `${d}px`;
        this.canvas.width = d;
        this.canvas.height = d;
        this.size = d;
    }

    doOnMouseMove(cb) {
        this.mouse.onMove(cb);
    }

    draw(lightSource, shapes, rays = 720) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let points = [];
        for (let i = 0; i < rays; i++) {
            const angle = 2 * Math.PI * i / rays;
            points.push(this.marchRay(lightSource, shapes, angle));
        }
        this.drawPolygon(points);
        for (let point of points) {
            this.context.beginPath();
            this.drawLine(lightSource, point);
            this.context.closePath();
            this.context.stroke();
        }
    }

    drawPolygon(points) {
        const absPoints = points.map(this.toAbsCoords.bind(this));
        this.context.fillStyle = "#FFF";
        this.context.strokeStyle = "#000";
        this.context.beginPath();
        this.context.lineWidth = 3;
        this.context.moveTo(absPoints[0].x, absPoints[0].y);
        for (let point of absPoints) {
            this.context.lineTo(point.x, point.y);
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }

    drawLine(a, b) {
        let aAbs = this.toAbsCoords(a);
        let bAbs = this.toAbsCoords(b);
        this.context.strokeStyle = "rgba(127, 127, 127, 0.25)";
        this.context.lineWidth = 1;
        this.context.moveTo(aAbs.x, aAbs.y);
        this.context.lineTo(bAbs.x, bAbs.y);
    }

    marchRay(lightSource, shapes, angle) {
        let point = lightSource.clone;
        let iter = 0;
        while (true) {
            iter++;
            if (iter > 20) {
                return point;
            }
            let dist = this.calcMinDist(point, shapes);
            const eps = 1e-6;
            if (dist < eps) {
                return point;
            }
            const delta = Vector.FromPolar(angle, dist);
            point = point.add(delta);
        }
    }

    calcMinDist(point, shapes) {
        return Math.min(
            this.calcMinDistToShapes(point, shapes),
            this.calcMinDistToBoundaries(point)
        )
    }

    calcMinDistToBoundaries(point) {
        return Math.min(point.x, point.y, 1 - point.x, 1 - point.y) + 0.1;
    }

    calcMinDistToShapes(point, shapes) {
        const dists = shapes.map((shape) => Math.abs(shape.distanceTo(point)));
        return Math.min(...dists);
    }

    toAbsCoords(point) {
        return new Vector(Math.round(point.x * this.size), Math.round(point.y * this.size));
    }
}
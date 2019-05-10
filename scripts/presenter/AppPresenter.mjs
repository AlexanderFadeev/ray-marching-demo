import Vector from "/common/Vector.mjs"

export default class AppPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        for (let i = 0; i < 10; i++) {
            this.model.addCircle();
        }
        this.model.lightSource = new Vector(0, 0);
        this.view.doOnMouseMove(this.onMouseMove.bind(this));
    }

    update() {
        this.view.draw(this.model.lightSource, this.model.shapes);
    }

    onMouseMove(pos) {
        this.model.lightSource = pos.clone;
    }
}
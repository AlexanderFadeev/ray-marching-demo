import Vector from "/common/Vector.mjs"

export default class AppPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        for (let i = 0; i < 3; i++) {
            this.model.addCircle();
        }
        this.model.addBoundaries();
        this.model.lightSource = new Vector(0, 0);
    }

    update() {
        this.view.draw(this.model.lightSource, this.model.shapes);
        this.model.lightSource.add(new Vector(0.01, 0.01));
        if (this.model.lightSource.x > 1) {
            this.model.lightSource = new Vector(0, 0);
        }
    }


}
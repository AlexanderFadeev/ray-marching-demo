import AppModel from "./model/AppModel.mjs";
import AppView from "./view/AppView.mjs";
import AppPresenter from "./presenter/AppPresenter.mjs";

export default class App {
    constructor(canvas) {
        this.model = new AppModel();
        this.view = new AppView(canvas);
        this.presenter = new AppPresenter(this.model, this.view);
    }

    tick() {
        this.presenter.update();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.presenter.init();
        this.tick();
    }
}
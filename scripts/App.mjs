import AppModel from "./app_model/AppModel.mjs";
import AppView from "./view/AppView.mjs";
import AppPresenter from "./presenter/AppPresenter.mjs";

export default class App {
    constructor(canvas) {
        this.model = new AppModel();
        this.view = new AppView(canvas);
        this.presenter = new AppPresenter(this.model, this.view);
    }

    start() {
        console.log("App is starting")
    }
}
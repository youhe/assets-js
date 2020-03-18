/****************************************************

  - Usage
  require('./modules/common/render-watch');

****************************************************/
import * as Stats from "./stats.js";

const FPS60 = [1, 1, 1, 1, 1, 1];
const FPS30 = [1, 0, 1, 0, 1, 0];
const FPS10 = [1, 0, 0, 0, 0, 0];

class RenderWatch {
  constructor(mode) {
    this._instances = [];

    this.working = true;
    this._fps = FPS60;
    this._frame = 0;

    this.start();
  }

  register(instance) {
    instance.RenderWatchWorking = true;
    this._instances.push(instance);
  }

  start() {
    this.working = true;
    this._render();
  }

  stop() {
    this.working = false;
  }

  reset() {
    this._frame = 0;
  }

  setDev(pos) {
    this._stats = new Stats();
    if (pos == "right") {
      this._stats.dom.style.left = "auto";
      this._stats.dom.style.right = 0;
    }
    document.body.appendChild(this._stats.dom);
    this._render = this._devRender;
  }

  setFps(val) {
    if (val == 60) this._fps = FPS60;
    if (val == 30) this._fps = FPS30;
    if (val == 10) this._fps = FPS10;
  }

  _render() {
    if (this.working === false) return;

    requestAnimationFrame(() => {
      this._render();
    });

    this._frame = this._frame + 1;
    if (this._fps[this._frame % 6] == 0) return;

    for (var i = 0; i < this._instances.length; i++) {
      if (this._instances[i].RenderWatchWorking === true) {
        this._instances[i].render(this._frame);
      }
    }
  }

  _devRender() {
    if (this.working === false) return;

    requestAnimationFrame(() => {
      this._render();
    });

    this._frame = this._frame + 1;
    if (this._fps[this._frame % 6] == 0) return;

    this._stats.begin();

    for (var i = 0; i < this._instances.length; i++) {
      if (this._instances[i].RenderWatchWorking === true) {
        this._instances[i].render(this._frame);
      }
    }

    this._stats.end();
  }
}

window.RenderWatch = new RenderWatch();

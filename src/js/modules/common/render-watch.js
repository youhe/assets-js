/****************************************************

  - Usage
  require('./modules/common/render-watch');

****************************************************/
const FPS60 = [1, 1, 1, 1, 1, 1];
const FPS30 = [1, 0, 1, 0, 1, 0];
const FPS10 = [1, 0, 0, 0, 0, 0];

class RenderWatch {
  constructor() {
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

  setFps(val) {
    if (val == 60) this._fps = FPS60;
    else if (val == 30) this._fps = FPS30;
    else if (val == 10) this._fps = FPS10;
    else console.error('not found FPS.')
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
}

window.RenderWatch = new RenderWatch();

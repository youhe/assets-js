/****************************************************

  - Usage
  require('./modules/common/render-watch');

****************************************************/
import * as Stats from "./stats.js";

const FPS60 = [1, 1, 1, 1, 1, 1];
const FPS30 = [1, 0, 1, 0, 1, 0];
const FPS10 = [1, 0, 0, 0, 0, 0];

class RenderWatch {
  constructor() {
    this.instances = [];

    this.working = true;
    this.fps = FPS60;
    this.frame = 0;

    this.isStats = true;
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.start();
  }

  register(instance) {
    instance.RenderWatchWorking = true;
    this.instances.push(instance);
  }

  start() {
    this.working = true;
    this.render();
  }

  stop() {
    this.working = false;
  }

  reset() {
    this.frame = 0;
  }

  setFps(val) {
    if (val == 60) this.fps = FPS60;
    if (val == 30) this.fps = FPS30;
    if (val == 10) this.fps = FPS10;
  }

  render() {
    if (this.working === false) return;

    requestAnimationFrame(() => {
      this.render();
    });

    this.stats.begin();

    if (this.fps[this.frame % 6] == 1) {
      for (var i = 0; i < this.instances.length; i++) {
        if (this.instances[i].RenderWatchWorking === true) {
          this.instances[i].render(this.frame);
        }
      }
    }

    this.frame = this.frame + 1;

    this.stats.end();
  }
}

window.RenderWatch = new RenderWatch();

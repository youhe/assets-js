/****************************************************

  - Usage
  require('./modules/common/render-watch');

****************************************************/

class RenderWatch {
  constructor() {
    this.instances = [];

    this.working = true;
    this.fps = 60;
    this.frame = 0;

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

  setFps30() {
    this.fps = 30;
  }

  setFps60() {
    this.fps = 60;
  }

  render() {
    if (this.working === false) return;

    if (this.fps == 60) {
      for (var i = 0; i < this.instances.length; i++) {
        if (this.instances[i].RenderWatchWorking === true) {
          this.instances[i].render(this.frame);
        }
      }
    } else if (this.fps == 30 && this.frame % 2 == 0) {
      for (var i = 0; i < this.instances.length; i++) {
        if (this.instances[i].RenderWatchWorking === true) {
          this.instances[i].render(this.frame * 0.5);
        }
      }
    }

    this.frame = this.frame + 1;

    requestAnimationFrame(() => {
      this.render();
    });
  }
}

window.RenderWatch = new RenderWatch();

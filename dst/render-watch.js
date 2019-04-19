/****************************************************
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
    instance.RenderWatchWarking = true;
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

  render() {
    if (this.working === false) return;

    for(var i = 0; i < this.instances.length; i++) {
      if (this.instances[i].RenderWatchWarking === true) {
        this.instances[i].render();
      }
    }
    this.frame = this.frame + 1;

    requestAnimationFrame(() => {
      this.render();
    });
  }
}

window.RenderWatch = new RenderWatch();

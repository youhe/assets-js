/****************************************************
  window.MouseMoveWatch.x -> x座標
  window.MouseMoveWatch.y -> y座標

  register で instances にインスタンスを追加すると
  mousemove時にそのインスタンスの mousemove が呼ばれる。
****************************************************/

class MouseMoveWatch {
  constructor() {
    if (!window.UserAgent.pc) return;

    this.instances = [];

    this.x = this._x = document.body.clientWidth / 2;
    this.y = this._y = window.innerHeight / 2;

    document.onmousemove = (e) => {
      if(this.instances.length === 0) return;

      if (!e) e = window.event;

      this.x = e.clientX;
      this.y = e.clientY;

      this.nX = e.clientX / window.ResizeWatch.width * 2 - 1;
      this.nY = e.clientY / window.ResizeWatch.height * -2 - 1;

      for(var i = 0; i < this.instances.length; i++) {
        this.instances[i].mousemove();
      }
    }
  }

  register(instance) {
    this.instances.push(instance);
  }
}

window.MouseMoveWatch = new MouseMoveWatch();

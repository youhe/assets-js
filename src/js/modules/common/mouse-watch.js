/****************************************************
  window.MouseWatch.x -> x座標
  window.MouseWatch.y -> y座標

  register で _instances にインスタンスを追加すると
  mousemove時にそのインスタンスの mousemove が呼ばれる。
****************************************************/

const Mkai = require("./mkai.js");

class MouseWatch {
  constructor() {
    this._instances = [];

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    if (!window.UserAgent.pc) return;

    document.onmousemove = e => {
      if (!e) e = window.event;

      this.x = e.clientX;
      this.y = e.clientY;

      this.nX = (e.clientX / window.ResizeWatch.width) * 2 - 1;
      this.nX = Mkai.round(this.nX, 0.0001);
      this.nX = Mkai.constrain(this.nX, -1, 1);

      this.nY = (e.clientY / window.ResizeWatch.height) * -2 + 1;
      this.nY = Mkai.round(this.nY, 0.0001);
      this.nY = Mkai.constrain(this.nY, -1, 1);

      for (var i = 0; i < this._instances.length; i++) {
        this._instances[i].mousemove();
      }
    };
  }

  register(instance) {
    this._instances.push(instance);
  }
}

window.MouseWatch = new MouseWatch();

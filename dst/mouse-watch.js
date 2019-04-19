/****************************************************
  window.MouseMoveWatch.x -> x座標
  window.MouseMoveWatch.y -> y座標

  register で instances にインスタンスを追加すると
  mousemove時にそのインスタンスの mousemove が呼ばれる。
****************************************************/

class MouseMoveWatch {
  constructor() {
    this.instances = [];

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    if (!window.UserAgent.pc) return;

    document.onmousemove = (e) => {
      if(this.instances.length === 0) return;

      if (!e) e = window.event;

      this.x = e.clientX;
      this.y = e.clientY;

      this.nX = e.clientX / window.ResizeWatch.width * 2 - 1;
      this.nX = Mkai.round(this.nX, 0.0001);
      this.nX = Mkai.constrain(this.nX, -1, 1);

      this.nY = e.clientY / window.ResizeWatch.height * -2 + 1;
      this.nY = Mkai.round(this.nY, 0.0001);
      this.nY = Mkai.constrain(this.nY, -1, 1);

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

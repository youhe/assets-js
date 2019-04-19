/****************************************************
  window.MouseMoveWatch.x -> x座標
  window.MouseMoveWatch.y -> y座標

  register で instances にインスタンスを追加すると
  mousemove時にそのインスタンスの mousemove が呼ばれる。
****************************************************/

class TouchMoveWatch {
  constructor() {
    this.instances = [];

    this.x = 0;
    this.y = 0;

    this.sX = 0;
    this.sY = 0;

    this.mX = 0;
    this.mY = 0;

    if (window.UserAgent.pc) return;

    document.addEventListener('touchstart', (e)=> {this.touchstart(e)}, false);
    document.addEventListener('touchmove', (e)=> {this.touchmove(e)}, false);
    document.addEventListener('touchend', (e)=> {this.touchend(e)}, false);
  }

  touchstart(e) {
    this.sX = e.touches[0].pageX;
    this.sY = e.touches[0].pageY;

    for(var i = 0; i < this.instances.length; i++) {
      this.instances[i].touchstart();
    }
  }

  touchmove(e) {
    this.mX = e.touches[0].pageX;
    this.mY = e.touches[0].pageY;

    this.x = this.mX - this.sX;
    this.y = this.mY - this.sY;

    for(var i = 0; i < this.instances.length; i++) {
      this.instances[i].touchmove();
    }
  }

  touchend(e) {
    this.x = 0;
    this.y = 0;

    this.sX = 0;
    this.sY = 0;

    this.mX = 0;
    this.mY = 0;

    for(var i = 0; i < this.instances.length; i++) {
      this.instances[i].touchend();
    }
  }

  register(instance) {
    this.instances.push(instance);
  }
}

window.TouchMoveWatch = new TouchMoveWatch();

/****************************************************
****************************************************/

export default class TouchMoveWatch {
  constructor(instance, target) {

    this.instance = instance;
    this.target = target;

    this.x = 0;
    this.y = 0;

    this.sX = 0;
    this.sY = 0;

    this.mX = 0;
    this.mY = 0;

    if (window.UserAgent.pc) return;

    this.target.addEventListener('touchstart', (e)=> {this.touchstart(e)}, false);
    this.target.addEventListener('touchmove', (e)=> {this.touchmove(e)}, false);
    this.target.addEventListener('touchend', (e)=> {this.touchend(e)}, false);
  }

  touchstart(e) {
    this.sX = e.touches[0].pageX;
    this.sY = e.touches[0].pageY;

    this.instance.touchstart(this.sX, this.sY);
  }

  touchmove(e) {
    this.mX = e.touches[0].pageX;
    this.mY = e.touches[0].pageY;

    this.x = this.mX - this.sX;
    this.y = this.mY - this.sY;

    this.instance.touchmove(this.x, this.y);
  }

  touchend(e) {
    this.instance.touchend(this.x, this.y);

    this.x = 0;
    this.y = 0;

    this.sX = 0;
    this.sY = 0;

    this.mX = 0;
    this.mY = 0;
  }
}

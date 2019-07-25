/****************************************************
****************************************************/

import boundRect from './bound-rect.js';
const Mkai = require('./mkai.js');

export default class TouchMoveWatch {
  constructor(instance, target) {

    this.instance = instance;
    this.target = target;

    this.br = boundRect(this.target);

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

    this.sX = Mkai.map(
      e.touches[0].pageX,
      this.br.left, this.br.width + this.br.left,
      -1, 1
    );
    this.sX = Mkai.constrain(this.sX, -1, 1)

    this.sY = Mkai.map(
      e.touches[0].pageY,
      this.br.top, this.br.height + this.br.top,
      -1, 1
    );
    this.sY = Mkai.constrain(this.sY, -1, 1)

    this.instance.touchstart({x: this.sX, y: this.sY});

  }

  touchmove(e) {

    this.mX = Mkai.map(
      e.touches[0].pageX,
      this.br.left, this.br.width + this.br.left,
      -1, 1
    );
    this.mX = Mkai.constrain(this.mX, -1, 1)

    this.mY = Mkai.map(
      e.touches[0].pageY,
      this.br.top, this.br.height + this.br.top,
      -1, 1
    );
    this.mY = Mkai.constrain(this.mY, -1, 1)

    this.instance.touchmove({x: this.mX, y: this.mY});

  }

  touchend(e) {

    this.instance.touchend({
      sX: this.sX, sY: this.sY,
      mX: this.mX, mY: this.mY,
    });

    this.sX = 0;
    this.sY = 0;

    this.mX = 0;
    this.mY = 0;

  }

}

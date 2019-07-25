require('../modules/common/user-agent');

import TouchWatch from '../modules/common/touch-watch.js';

export default function() {

  class Hoge {

    constructor() {

      const elm = document.getElementById('js-box');
      new TouchWatch(this, elm);

    }

    touchstart(e) {
      console.log(e.x, e.y);
    }

    touchmove(e) {
      console.log(e.x, e.y);
    }

    touchend(e) {
      console.log(e.sX, e.sY, e.mX, e.mY);
    }

  }

  new Hoge();

};

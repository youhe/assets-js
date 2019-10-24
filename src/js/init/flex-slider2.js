require('../modules/common/user-agent');
require('../modules/common/resize-watch');
require('../modules/common/render-watch');

import FlexSlider from '../modules/common/flex-slider/app.js';

export default function() {

  class Hoge {

    constructor() {

      const elm0 = document.getElementById('js-flex-slider0');
      const ops0 = {
        slidesPerView: 1,
        spaceBetween: 0,
        autoPlayOnMouse: true,
        sp: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      };
      new FlexSlider(elm0, ops0);

    }

  }

  new Hoge();

};

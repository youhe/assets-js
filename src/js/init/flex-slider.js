require('../modules/common/user-agent');
require('../modules/common/resize-watch');
require('../modules/common/render-watch');

import FlexSlider from '../modules/common/flex-slider.js';

export default function() {

  class Hoge {

    constructor() {

      const elm = document.getElementById('js-flex-slider');
      const ops = {
        slidesPerView: 3.2,
        spaceBetween: 20,
        sp: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        }
      };
      new FlexSlider(elm, ops);

    }

  }

  new Hoge();

};

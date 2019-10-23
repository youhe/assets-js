require('../modules/common/user-agent');
require('../modules/common/resize-watch');
require('../modules/common/render-watch');

import FlexSlider from '../modules/common/flex-slider/app.js';

export default function() {

  class Hoge {

    constructor() {

      const elm0 = document.getElementById('js-flex-slider0');
      const ops0 = {
        slidesPerView: 3.2,
        spaceBetween: 20,
        sp: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        }
      };
      new FlexSlider(elm0, ops0);

      const elm1 = document.getElementById('js-flex-slider1');
      const ops1 = {
        slidesPerView: 5.0,
        spaceBetween: 0,
        centeredSlides: false,
        sp: {
          slidesPerView: 2.0,
          spaceBetween: 0,
          centeredSlides: false,
        }
      };
      new FlexSlider(elm1, ops1);


      const elm2 = document.getElementById('js-flex-slider2');
      const ops2 = {
        slidesPerView: 1.1,
        spaceBetween: 40,
        animationTime: 700,
        sp: {
          slidesPerView: 1.0,
          spaceBetween: 0,
        }
      };
      new FlexSlider(elm2, ops2);

    }

  }

  new Hoge();

};

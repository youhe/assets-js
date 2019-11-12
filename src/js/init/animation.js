const easeing = require('../modules/common/easing');
const Animation = require('../modules/common/animation').default;

export default function() {

  var staF = function() {
    console.log('start');
  };

  var aniF0 = function(f) {
    console.log(f);
    const elm = document.getElementById('js-box');
    elm.style.transform = `translateX( ${ f * 400 }px )`;
  };

  var aniF1 = function(f) {
    console.log(f);
    const elm = document.getElementById('js-box');
    elm.style.transform = `translateX( ${ 400 - (f * 400) }px )`;
  };

  var finF0 = function() {
    console.log('fin');
    Animation(2, easeing.easeInOutExpo, staF, aniF1, finF1);
  };

  var finF1 = function() {
    console.log('fin');
    Animation(2, easeing.easeInOutExpo, staF, aniF0, finF0);
  };

  Animation(2, easeing.easeInOutExpo, staF, aniF0, finF0);

};

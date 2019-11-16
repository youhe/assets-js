const easeing = require('../modules/common/easing');
const twAnimation = require('../modules/common/tween-animation').default;

export default function() {

  var staF = function() {
    console.log('start');
  };

  var aniF0 = function(f) {
    console.log(f);

    const eF0 = easeing.easeInOutExpo(f);
    const eF1 = easeing.easeInOutSine(f);

    const elm = document.getElementById('js-box');
    elm.style.transform = `translate( ${ eF0 * 400 }px, ${ eF1 * 400 }px )`;
  };

  var aniF1 = function(f) {
    console.log(f);

    const eF0 = easeing.easeInOutExpo(f);
    const eF1 = easeing.easeInOutSine(f);

    const elm = document.getElementById('js-box');
    elm.style.transform = `translate( ${ 400 - (eF0 * 400) }px, ${ 400 - (eF1 * 400) }px )`;
  };

  var finF0 = function() {
    console.log('fin');
    twAnimation(2, staF, aniF1, finF1);
  };

  var finF1 = function() {
    console.log('fin');
    twAnimation(2, staF, aniF0, finF0);
  };

  twAnimation(2, staF, aniF0, finF0);

};

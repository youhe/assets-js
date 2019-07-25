require('../modules/common/user-agent');
require('../modules/common/resize-watch');

export default function() {

  class Hoge {
    resize() {
      console.log(
        'width:' + window.ResizeWatch.width,
        'height:' + window.ResizeWatch.height,
        'aspect:' + window.ResizeWatch.aspect,
      );
    }
  }
  window.ResizeWatch.register(new Hoge);

};

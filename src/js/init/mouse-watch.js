require('../modules/common/user-agent');
require('../modules/common/resize-watch');
require('../modules/common/mouse-watch');

export default function() {
  class Hoge {
    mousemove() {
      console.log(
        'y:' + window.MouseWatch.x,
        'x:' + window.MouseWatch.y,
        'nX:' + window.MouseWatch.nX,
        'nY:' + window.MouseWatch.nY,
      );
    }
  }
  window.MouseWatch.register(new Hoge);
};

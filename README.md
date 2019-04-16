assets-js

========

## Usage

### bound rect

```javascript
const boundRect = require('./bound-rect').default;
const br = boundRect(elm);
console.log(
  br.top,
  br.left,
  br.width,
  br.height,
  br.fixTop,
  br.fixLeft
);
```

### page scroll

```javascript
const pageScroll = require('./page-scroll').default;
pageScroll(start, end);
```

### easeing

```javascript
const easeing = require('./easing');
```

### mouse watch
```javascript
require('./mouse-watch');

class Hoge {
  mousemove() {
    console.log(
      'y:' + window.MouseMoveWatch.x,
      'x:' + window.MouseMoveWatch.y,
    );
  }
}

window.MouseMoveWatch.register(new Hoge);
```

### resize watch
```javascript
require('./resize-watch');

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
```

### user agent
```javascript
require('./modules/common/user-agent');

console.log(window.UserAgent.pc);
console.log(window.UserAgent.tablet);
console.log(window.UserAgent.mobile);

// show userAgent
console.log(window.UserAgent.displayLog());
```

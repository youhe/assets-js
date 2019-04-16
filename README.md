assets-js

========

## Usage

### pageScroll

```javascript
const pageScroll = require('../modules/common/pageScroll').default;
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

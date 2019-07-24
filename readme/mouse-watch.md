# mouse-watch.js

## Usage

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

# touch-watch.js

## Usage

```javascript
const touchWatch = require('./touch-watch').default;
class Hoge() {
  touchstart(x, y) {

  }
  touchmove(x, y) {

  }
  touchend(x, y) {

  }
}
const hoge = new Hoge();
touchWatch(hoge, dom);
```

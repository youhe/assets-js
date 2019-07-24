### resize-watch.js

## Usage

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

// event発生をPCのみに変更
window.ResizeWatch.setEventOnlyPc();

// event発生を全てに変更
window.ResizeWatch.setEventAll();
```

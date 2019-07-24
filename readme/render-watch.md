### render-watch.js

## Usage

```javascript
require('./render-watch');

class Hoge {
  render(frame) {
    console.log(frame);
  }
  start() {
    this.RenderWatchWorking = true;
  }
  stop() {
    this.RenderWatchWorking = false;
  }
}
window.RenderWatch.register(new Hoge);

// render停止
window.RenderWatch.stop();

// render再開
window.RenderWatch.start();

// frame数リセット
window.RenderWatch.reset();

// FPSを30に変更
window.RenderWatch.setFps30();

// FPSを60に変更
window.RenderWatch.setFps60();

// インスタンス停止
this.RenderWatchWorking = false;

// インスタンス再開
this.RenderWatchWorking = true;

```

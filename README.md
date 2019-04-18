# assets-js

========

## Usage

### Mkai
```javascript
const Mkai = require('./mkai');
// ラジアン -> 角度
Mkai.degree();

// 角度ラ -> ジアン
Mkai.radian();

// min <= val <= max
Mkai.constrain(val, min, max);

// baseの桁で四捨五入
Mkai.round(val, base);

// baseの桁で切り捨て
Mkai.floor(val);

// min ~ max のランダム値
Mkai.random(min, max);

// min ~ max のランダム整数
Mkai.randomF();

// 写像
Mkai.map(val, s1, e1, s2, e2);

// 原点からの距離
Mkai.mag(x, y);

// 1と2の距離
Mkai.dist(x1, y1, x2, y2);

// 線形補間
Mkai.mix();

// HSV -> RGB
Mkai.hsvToRgb(h, s, v);

```

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
easeing.easeInQuad();
easeing.easeOutQuad();
easeing.easeInOutQuad();
easeing.easeInCubic();
easeing.easeOutCubic();
easeing.easeInOutCubic();
easeing.easeInQuart();
easeing.easeOutQuart();
easeing.easeInOutQuart();
easeing.easeInQuint();
easeing.easeOutQuint();
easeing.easeInSine();
easeing.easeOutSine();
easeing.easeInOutSine();
easeing.easeInExpo();
easeing.easeOutExpo();
easeing.easeInOutExpo();
easeing.easeInCirc();
easeing.easeOutCirc();
easeing.easeInOutCirc();
easeing.easeOutBounce();
easeing.easeInBack();
easeing.easeOutBack();
easeing.easeInOutBack();
easeing.elastic();
easeing.swingFromTo();
easeing.swingFrom();
easeing.swingTo();
easeing.bounce();
easeing.bouncePast();
easeing.easeFromTo();
easeing.easeFrom();
easeing.easeTo();
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

// event発生をPCのみに変更
window.ResizeWatch.eventonlypc();

// event発生を全てに変更
window.ResizeWatch.eventAll();
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

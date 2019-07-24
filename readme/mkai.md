# mkai.js

## Usage

```javascript
const Mkai = require('./mkai');

// ラジアン -> 角度
Mkai.degree();

// 角度 -> ラジアン
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

// 2点間(x, y)の距離
Mkai.dist(x1, y1, x2, y2);

// 線形補間
Mkai.mix(a, b, m);

// HSV -> RGB
Mkai.hsvToRgb(h, s, v);

```

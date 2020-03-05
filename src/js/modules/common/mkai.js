// --------------------------------------------------
// mkai.js v0.0.2
// Math 改
// This code may be freely distributed under the MIT license
// --------------------------------------------------
(function(name, definition) {
  /*global define module*/
  if (typeof define == "function") define(definition);
  else if (typeof module != "undefined") module.exports = definition;
  else this[name] = definition;
})("Mkai", {
  /*********************************
    ラジアン -> 角度
  *********************************/
  degree: function(val) {
    return (val / Math.PI) * 180;
  },

  /*********************************
    角度 -> ラジアン
  *********************************/
  radian: function(val) {
    return (val * Math.PI) / 180;
  },

  /*********************************
    val を min と max の間に制限する
  *********************************/
  constrain: function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },
  clamp: function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },

  /*********************************
   * 任意の桁で四捨五入
   * @param {number} value 四捨五入する数値
   * @param {number} base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
   * @return {number} 四捨五入した値
   *********************************/
  round: function(val, base) {
    return Math.round(val / base) * base;
  },

  /*********************************
   任意の桁で切り捨て
    10 -> 10の位
    0.1 -> 小数第１位
  *********************************/
  floor: function(val, base) {
    return Math.floor(val / base) * base;
  },

  /*********************************
    乱数
  *********************************/
  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },

  /*********************************
    乱数（int）
  *********************************/
  randomF: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  /*********************************
    写像
  *********************************/
  map: function(val, s1, e1, s2, e2) {
    return s2 + (e2 - s2) * ((val - s1) / (e1 - s1));
  },

  /*********************************
    原点からの距離
  *********************************/
  mag: function(x, y) {
    return Math.sqrt(x * x + y * y);
  },

  /*********************************
    2点間の距離
  *********************************/
  dist: function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  },

  /*********************************
    線形補間
  *********************************/
  mix: function(a, b, m) {
    return a * (1 - m) + b * m;
  },

  /*******************************
    HSVをRGBに変換
  *******************************/
  hsvToRgb: function(h, s, v) {
    h /= 360;
    s /= 100;
    v /= 100;
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }

    return [r, g, b];
  },

  /*******************************
    HEXをRGBに変換
  *******************************/
  hexToRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  },

  /*******************************
    1 か -1 を返す
  *******************************/
  signV: function() {
    return Math.sign(Math.random() - 0.5);
  }
});

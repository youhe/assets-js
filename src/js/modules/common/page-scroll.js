const easeing = require("./easing");

/**
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {number} time 
 * 
 * time
 * 0.016で1秒
 * 0.012で1.5秒
 * 0.008で2秒
 */
export default function(start, end, time = 0.012) {
  function scrollAnimation(p, sy, ey, time) {
    p = Math.min(p, 1.0);
    if (p < 1)
      requestAnimationFrame(() => {
        scrollAnimation(p + time, sy, ey, time);
      });

    const tP = easeing.easeInOutQuad(p);
    scrollTo(0, (ey - sy) * tP + sy);
  }

  scrollAnimation(0, start, end, time);
}

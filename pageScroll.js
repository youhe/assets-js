const easeing = require('./easing');

export default function(start, end) {
  scrollAnimation(0, start, end);

  function scrollAnimation(p, sy, ey) {
    p = Math.min(p, 1.0);
    if (p < 1) requestAnimationFrame(() => {
      scrollAnimation(p + 0.02, sy, ey)
    });

    const tP = easeing.easeInOutQuad(p);
    scrollTo(0, (ey - sy) * tP + sy);
  }
}

require('@babel/polyfill');

import UaParser from 'ua-parser-js';
import sleep from 'js-util/sleep';

const pageId = document.querySelector('.l-page').getAttribute('data-page-id');
const uaParser = new UaParser();
const link = document.querySelector('link[as=style]');

const init = async () => {
  // Preload the stylesheet in browsers that are enabled an attribute link.preload.
  const browser = uaParser.getBrowser().name;
  if (browser !== 'Chrome' && browser !== 'Edge') link.rel = 'stylesheet';

  await sleep(100);

  // run initialize function.
  switch (pageId) {
    case 'accordion':
      require ('./init/accordion.js').default();
      break;
    case 'modalFixed':
      require ('./init/modal-fixed.js').default();
      break;
    case 'mouseWatch':
      require ('./init/mouse-watch.js').default();
      break;
    case 'renderWatch':
      require ('./init/render-watch.js').default();
      break;
    case 'resizeWatch':
      require ('./init/resize-watch.js').default();
      break;
    case 'userAgent':
      require ('./init/user-agent.js').default();
      break;
    case 'pageScroll':
      require ('./init/page-scroll.js').default();
      break;
    case 'flexSlider':
      require ('./init/flex-slider.js').default();
      break;
    case 'touchWatch':
      require ('./init/touch-watch.js').default();
      break;
    default:
  }
}
init();

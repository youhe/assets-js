require('@babel/polyfill');

import sleep from 'js-util/sleep';

const pageId = document.querySelector('.l-page').getAttribute('data-page-id');

const init = async () => {
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
    case 'flexSlider1':
      require ('./init/flex-slider1.js').default();
      break;
    case 'flexSlider2':
      require ('./init/flex-slider2.js').default();
      break;
    case 'touchWatch':
      require ('./init/touch-watch.js').default();
      break;
    default:
  }
}
init();

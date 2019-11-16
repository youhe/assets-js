import { log } from 'util';

const Mkai = require('./Mkai');

export default function( duration, staF, aniF, finF ) {

  staF();
  animate( 0, duration * 60 );

  function animate( frame, duration ) {

    const f = Mkai.constrain(frame / duration, 0.0, 1.0);

    aniF(f);

    if ( f < 1 ) {
      requestAnimationFrame(() => {
        animate( frame + 1, duration );
      });
    } else {
      finF();
    }

  }
}

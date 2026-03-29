import { animate, scroll, cubicBezier } 
from 'https://cdn.jsdelivr.net/npm/motion@11.11.16/+esm';

const section = document.querySelector('.scroll-area');
const layers = document.querySelectorAll('.layer');
const scaler = document.querySelector('.scaler img');

if (!section) return;

/* Animate layers */
layers.forEach((layer, index) => {

  scroll(
    animate(layer, {
      opacity: [0, 1],
      scale: [0.7, 1]
    }, {
      easing: cubicBezier(0.65, 0, 0.35, 1)
    }),
    {
      target: section,
      offset: ['start start', '80% end']
    }
  );

});

/* Animate center image shrink */
scroll(
  animate(scaler, {
    scale: [1.6, 1]
  }, {
    easing: cubicBezier(0.65, 0, 0.35, 1)
  }),
  {
    target: section,
    offset: ['start start', '60% end']
  }
);
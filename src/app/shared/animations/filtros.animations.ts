import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const filtrosAnimacao = trigger('filtrosAnimacao', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(-20px)',
    })
  ),
  transition(':enter', [
    animate(
      '0.3s ease-in',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '0.2s ease-out',
      style({
        opacity: 0,
        transform: 'translateY(-20px)',
      })
    ),
  ]),
]);

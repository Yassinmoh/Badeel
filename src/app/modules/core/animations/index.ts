import { animate, style, transition, trigger } from "@angular/animations";

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100px)' }),
    animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
])

export const fadeIn= trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms', style({ opacity: 1 })),
  ]),
])


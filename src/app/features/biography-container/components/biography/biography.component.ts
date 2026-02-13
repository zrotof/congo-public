import { AfterViewInit, Component, ElementRef, inject, NgZone, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BIOGRAPHY_DATA } from '../../../../shared/constants/biography.constant';

import { CarouselModule } from 'primeng/carousel';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgOptimizedImage,
    CarouselModule
  ]
})

export class BiographyComponent implements AfterViewInit {

  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('animatedCards', { static: false }) animatedCards!: ElementRef<HTMLDivElement>;
 
  private myScrollTriggerInstance: ScrollTrigger[] = [];

  protected readonly biographyBlocs = BIOGRAPHY_DATA;

  protected readonly responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      gsap.set(".liberty", {
        opacity: "1"
      })

      gsap.set(".img", {
        opacity: "1"
      })

      this.ngZone.runOutsideAngular(() => {
        const cards = gsap.utils.toArray<HTMLElement>(
          this.animatedCards.nativeElement.querySelectorAll('.biography-element')
        );

        cards.forEach((card: HTMLElement, index: number) => {
          if (index < cards.length - 1) {
            this.myScrollTriggerInstance.push(ScrollTrigger.create({
              trigger: card,
              start: "top top", // L'animation se déclenche quand le haut de la boîte atteint le centre de l'écran
              endTrigger: cards[cards.length - 1],
              end: "bottom bottom",
              pin: true,        // La boîte reste fixée sur l'écran
              pinSpacing: false, // Aucun espace entre la boîte et le haut de l'écran,
              onLeave: (() => {
                gsap.set(".liberty", {
                  opacity: "0"
                })

                gsap.set(".img", {
                  opacity: "0"
                })
              }),
              onEnterBack: (() => {
                gsap.set(".liberty", {
                  opacity: "1"
                })

                gsap.set(".img", {
                  opacity: "1"
                })
              }),
              onUpdate: (self) => {
                const progress = self.progress;
                const scale = 1 - progress * 0.25;
                const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                const afterOpacity = progress;

                gsap.set(card, {
                  scale: scale,
                  rotation: rotation,
                  "--after-opacity": afterOpacity
                })
              }
            }))
          }
        });
      })
    }
  }

  ngOnDestroy(): void {
    // Nettoyez l'animation et le ScrollTrigger pour éviter les fuites de mémoire
    if (this.myScrollTriggerInstance) {
      this.myScrollTriggerInstance.forEach(st => st.kill());
    }
    // Une bonne pratique générale pour tout le composant
    gsap.killTweensOf(this.animatedCards.nativeElement);
  }
}

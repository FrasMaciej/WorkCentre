import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'animated-slogan',
    template: `
    <div class="container">
      <h3 class="an-1" #sloganRef [@textAnimation]="state">{{ currentSlogan }}</h3>
    </div>
  `,
    styles: [`
  p {
      font-family: Lato;
    }

    .container {
      width: 80vw;
      height: 20vh; /* Dostosuj wysokość kontenera */
      margin-left: auto;
      margin-right: auto;
      display: grid;
      align-content: center;
      text-align: center;
      color: var(--dark);
    }

    .an-1 {
      font-weight: 900;
      font-size: 4vw; /* Dostosuj rozmiar fontu */
      line-height: 1.2em; /* Dostosuj line-height */
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
    }
  `],
    animations: [
        trigger('textAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('2s', style({ opacity: 1 })),
                animate('2s', style({ opacity: 1 })),
                animate('2s', style({ opacity: 0 }))
            ]),
            transition(':leave', [
                animate('0s', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AnimatedSloganComponent implements OnInit, OnDestroy {
    @Input() slogans: string[] = ['Achieve your goals', 'Find matching job opportunity', 'Hire professionals'];
    currentSlogan: string = '';
    sloganIndex: number = 0;
    letterIndex: number = 0;
    state: 'in' | 'out' = 'in';

    @ViewChild('sloganRef', { static: true }) sloganRef!: ElementRef;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.updateSlogan();
    }

    ngOnDestroy(): void {
        // Add any cleanup if needed
    }

    updateSlogan(): void {
        const sloganElement: HTMLElement = this.sloganRef.nativeElement;
        const slogan = this.slogans[this.sloganIndex];
        const letters = slogan.split('');

        this.letterIndex = 0; // Reset the letter index
        this.currentSlogan = '';

        const interval = setInterval(() => {
            if (this.letterIndex < letters.length) {
                this.currentSlogan += letters[this.letterIndex];
                this.letterIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    this.state = 'out';
                    setTimeout(() => {
                        this.sloganIndex = (this.sloganIndex + 1) % this.slogans.length;
                        this.currentSlogan = '';
                        this.state = 'in';
                        this.updateSlogan();
                    }, 2000); // Delay before starting the next slogan
                }, 2000); // The duration of the fadeInOut animation
            }
        }, 100); // Delay between adding each letter
    }
}
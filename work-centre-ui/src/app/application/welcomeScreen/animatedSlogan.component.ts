import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'animated-slogan',
    template: `
    <div class="container">
      <h3 #sloganRef [@textAnimation]="state">{{ currentSlogan }}</h3>
    </div>
  `,
    styles: [`
    .container {
      width: 80vw;
      height: 20vh;
      margin: 0 auto;
      display: grid;
      align-items: center;
      text-align: center;
      color: #ffffff;
    }

    h3 {
      font-weight: 900;
      font-size: 2rem;
      line-height: 1.4;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      font-family: 'Arial', sans-serif;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
  `],
    animations: [
        trigger('textAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', keyframes([
                    style({ opacity: 0, transform: 'scale(0.8)' }),
                    style({ opacity: 1, transform: 'scale(1.1)' }),
                    style({ opacity: 1, transform: 'scale(1)' })
                ]))
            ]),
            transition(':leave', [
                animate('0.5s', style({ opacity: 0, transform: 'scale(0.8)' }))
            ])
        ])
    ]
})
export class AnimatedSloganComponent implements OnInit {
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

    updateSlogan(): void {
        const sloganElement: HTMLElement = this.sloganRef.nativeElement;
        const slogan = this.slogans[this.sloganIndex];
        const letters = slogan.split('');

        this.letterIndex = 0;
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
                    }, 500);
                }, 500);
            }
        }, 100);
    }
}
import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'svg-icon',
    template: ``,
    styles: [`
        :host {
            height: 100%;
            width: 100%;
            background-color: black;
            -webkit-mask-size: contain;
            -webkit-mask-position: center;
            -webkit-mask-repeat: no-repeat;
        }
    `]
})

export class SvgIconComponent {
    @HostBinding('style.-webkit-mask-image')
    private _path!: string;

    @Input()
    public set path(filePath: string) {
        this._path = `url("${filePath}")`;
    }
}
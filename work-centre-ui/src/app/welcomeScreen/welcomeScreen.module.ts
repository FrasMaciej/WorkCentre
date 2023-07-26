import { NgModule } from '@angular/core';

import { WelcomeScreenMainComponent } from './welcomeScreenMain.component';
import { CommonControlsModule } from '../commonControls.module';

@NgModule({
    imports: [CommonControlsModule],
    exports: [],
    declarations: [WelcomeScreenMainComponent],
    providers: [],
})
export class WelcomeScreenModule { }

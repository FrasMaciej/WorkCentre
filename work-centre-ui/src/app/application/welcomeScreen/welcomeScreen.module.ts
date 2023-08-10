import { NgModule } from '@angular/core';

import { WelcomeScreenMainComponent } from './welcomeScreenMain.component';
import { AnimatedSloganComponent } from './animatedSlogan.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [CommonControlsModule, BrowserAnimationsModule],
    exports: [],
    declarations: [WelcomeScreenMainComponent, AnimatedSloganComponent],
    providers: [],
})
export class WelcomeScreenModule { }

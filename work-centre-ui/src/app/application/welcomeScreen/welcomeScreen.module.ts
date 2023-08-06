import { NgModule } from '@angular/core';

import { WelcomeScreenMainComponent } from './welcomeScreenMain.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { AnimatedSloganComponent } from './animatedSlogan.component';

@NgModule({
    imports: [CommonControlsModule],
    exports: [],
    declarations: [WelcomeScreenMainComponent, AnimatedSloganComponent],
    providers: [],
})
export class WelcomeScreenModule { }

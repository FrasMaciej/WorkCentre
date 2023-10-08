import { NgModule } from '@angular/core';
import { ConversationComponent } from './conversation.component';
import { SendMessageModalComponent } from './sendMessageModal.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonControlsModule, FormsModule],
    exports: [],
    declarations: [ConversationComponent, SendMessageModalComponent],
    providers: [],
})
export class ConversationModule { }

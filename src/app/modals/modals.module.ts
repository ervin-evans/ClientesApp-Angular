import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUploadImageComponent } from './modal-upload-image/modal-upload-image.component';
import { ModalUserComponent } from './modal-user/modal-user.component';

@NgModule({
  declarations: [
    ModalClientComponent,
    ModalUploadImageComponent,
    ModalUserComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ModalClientComponent,
    ModalUploadImageComponent,
    ModalUserComponent,
  ],
})
export class ModalsModule {}

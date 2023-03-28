import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalClientComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModalClientComponent],
})
export class ModalsModule {}

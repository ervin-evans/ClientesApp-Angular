import { Injectable, OnInit } from '@angular/core';

declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class ModalsService implements OnInit {
  public formModalWindow: any;
  constructor() {}

  ngOnInit(): void {}

  public openModal(modalName: string) {
    this.formModalWindow = new window.bootstrap.Modal(
      document.getElementById(modalName)
    );
    this.formModalWindow.show();
  }
  public closeModal() {
    this.formModalWindow.hide();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  protected showSubMenu: boolean = false;
  constructor() {}
  public showSubmenu() {
    if (this.showSubMenu) this.showSubMenu = false;
    else this.showSubMenu = true;
  }
}

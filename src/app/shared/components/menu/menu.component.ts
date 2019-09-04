import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router, private menuController: MenuController) {}

  public handleNavigation(route: string): void {
    this.router.navigate([route]).then(() => this.menuController.close());
  }
}

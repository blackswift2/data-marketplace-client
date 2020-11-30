import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  AfterViewInit,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { RootLayout } from '../root/root.component';

@Component({
  selector: 'condensed-layout',
  templateUrl: './condensed.component.html',
  styleUrls: ['./condensed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CondensedComponent extends RootLayout implements OnInit {
  httpRouter;
  displayName;
  menuLinks = [];

  //TODO:: MOVE TO AUTH SERVICE
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    this.displayName = `${userData.firstName} ${userData.lastName}`;
    if (userData.role === 1 || userData.role === 2) {
      this.menuLinks = [
        {
          label: 'Dashboard',
          routerLink: 'dashboard',
          iconType: 'pg',
          iconName: 'home',
        },
        {
          label: 'Manage Teams',
          routerLink: 'manageTeams',
          iconType: 'pg',
          iconName: 'social',
        },
        {
          label: 'Manage Users',
          iconType: 'pg',
          iconName: 'grid',
          toggle: 'close',
          submenu: [
            {
              label: 'Create User',
              routerLink: 'adduser',
              iconType: 'pg',
              iconName: 'social',
            },
            {
              label: 'View Users',
              routerLink: 'manageUsers',
              iconType: 'pg',
              iconName: 'layout',
            },
          ],
        },
      ];
    } else if (userData.role === 3)
      this.menuLinks = [
        {
          label: 'Dashboard',
          routerLink: 'dashboard',
          iconType: 'pg',
          iconName: 'home',
        },
      ];
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }
}

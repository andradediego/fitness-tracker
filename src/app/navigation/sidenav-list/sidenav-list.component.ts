import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { IMenu } from './../../auth/imenu.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  public isAuth = false;
  public menus: IMenu[] = null;

  public authSubscription: Subscription;
  public menuSubscription: Subscription;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus: boolean) => {
        this.isAuth = authStatus;
      }
    );

    this.menuSubscription = this.authService.displayMenu.subscribe(
      (menus: IMenu[]) => {
        this.menus = menus;
      }
    );

    if (this.menus === null) {
      this.authService.firstAcess();
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}

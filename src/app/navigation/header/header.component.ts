import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { IMenu } from '../../auth/imenu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth = false;
  public menus: IMenu[] = null;
  public authSubscription: Subscription;
  public menuSubscription: Subscription;

  @Output() sidenavToggle = new EventEmitter<void>();


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


  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}

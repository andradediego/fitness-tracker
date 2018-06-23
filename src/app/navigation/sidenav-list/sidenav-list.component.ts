import { Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs';
import { IMenu } from './../../auth/imenu.model';
import { AuthService } from '../../auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  public isAuth$: Observable<boolean>;
  public menus$: Observable<IMenu[]>;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IAppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    this.menus$ = this.store.select(fromRoot.getMenu);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}

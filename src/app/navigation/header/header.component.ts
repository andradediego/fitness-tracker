import { AuthService } from '../../auth/auth.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

import { Observable } from 'rxjs';
import { IMenu } from '../../auth/imenu.model';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuth$: Observable<boolean>;
  public menus$: Observable<IMenu[]>;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private store: Store<fromRoot.IAppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    this.menus$ = this.store.select(fromRoot.getMenu);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}

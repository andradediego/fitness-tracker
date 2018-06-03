import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Input() menus;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }
}

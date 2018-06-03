import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openSidenav = false;
  menus = [
    {
      name: 'Signup',
      icon: 'face',
      router: '/signup'
    },
    {
      name: 'Login',
      icon: 'input',
      router: '/login'
    },
    {
      name: 'Training',
      icon: 'fitness_center',
      router: '/training'
    }
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuItems: string[] = ['Home', 'Products', 'About', 'Contact'];
  topBarItems: string[] = [
    'Help',
    'Exchange & Returns',
    'Order Tracker',
    'SignUp / Login',
  ];
}

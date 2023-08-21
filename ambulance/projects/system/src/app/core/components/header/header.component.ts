import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'amb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }
}

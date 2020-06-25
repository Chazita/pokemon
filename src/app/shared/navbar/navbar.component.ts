import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token;
  userName;
  constructor() {}

  ngOnInit(): void {
    const helper = new JwtHelperService();
    this.token = helper.decodeToken(localStorage.getItem('token'));
    this.userName = localStorage.getItem('name');
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('favorite');
    localStorage.removeItem('name');
    localStorage.removeItem('favoriteItem');
    window.location.href = 'home';
  }
}

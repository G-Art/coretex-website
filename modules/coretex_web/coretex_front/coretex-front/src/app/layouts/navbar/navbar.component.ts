import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .heroes-container {
        margin: 10px;
      }

      .margin-user {
        margin-right: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get authUser(): Auth {
    return this.authService.authUser;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['./404']);
  }
}

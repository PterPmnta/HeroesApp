import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private user: Auth | undefined;

  get authUser(): Auth {
    return { ...this.user! };
  }

  constructor(private http: HttpClient) {}

  login() {
    return this.http
      .get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(tap((resp) => (this.user = resp)));
  }
}

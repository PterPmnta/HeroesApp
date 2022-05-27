import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

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
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((resp) => (this.user = resp)),
      tap((resp) => localStorage.setItem('token', resp.id))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user = undefined;
  }

  verificaAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this.user = auth;
        return true;
      })
    );
  }
}

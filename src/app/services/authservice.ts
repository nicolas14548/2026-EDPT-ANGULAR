import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiURL = `${environment.base}/login`;
  private tokenKey = 'token';
  private usernameKey = 'username';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string, username: string }> {
    return this.http.post<{ token: string, username: string }>(this.apiURL, { username, password }).pipe(
      tap(data => {
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.usernameKey, data.username);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
  }
}

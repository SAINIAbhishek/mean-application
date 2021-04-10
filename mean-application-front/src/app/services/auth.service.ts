import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _user: User | null = <User>{};

  private _authToken = '';

  constructor(private _httpClient: HttpClient) { }

  private _loadToken() {
    this._authToken = localStorage.getItem('mean_app_token')
      ? <string>localStorage.getItem('mean_app_token') : '';
  }

  public initializeUser(token: string, user: User) {
    this._authToken = token;
    this._user = user;
    localStorage.setItem('mean_app_token', JSON.stringify(token));
    localStorage.setItem('mean_app_user', JSON.stringify(user));
  }

  public register(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._httpClient.post('http://localhost:3000/api/users/register', user, {headers: headers});
  }

  public login(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._httpClient.post('http://localhost:3000/api/authenticate/login', user, {headers: headers});
  }

  public profile() {
    let headers = new HttpHeaders();
    this._loadToken();
    headers.append('Authorization', this._authToken);
    headers.append('Content-Type', 'application/json');
    return this._httpClient.get('http://localhost:3000/api/users/profile', {headers: headers});
  }

  public logout() {
    this._user = null;
    this._authToken = '';
    localStorage.removeItem('mean_app_token');
    localStorage.removeItem('mean_app_user');
  }

  get isAuthenticated(): boolean {
    return !!(this._user && this._user.id && this._authToken);
  }

  get authUser(): User | null {
    return this._user;
  }

  get user(): User | null {
    return this._user;
  }

}

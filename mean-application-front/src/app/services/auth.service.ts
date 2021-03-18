import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _user: User = <User>{};

  private _authToken = '';

  constructor(private _httpClient: HttpClient) { }

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

  get authUser(): User {
    return this._user;
  }

  get user(): User {
    return this._user;
  }

}

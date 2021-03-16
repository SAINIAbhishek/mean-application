import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  public register(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._httpClient.post('http://localhost:3000/api/users/register', user, {headers: headers});
  }

}

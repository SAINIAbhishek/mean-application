import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  public onSignOutClick(event: Event) {
    event.preventDefault();
    this._authService.logout();
    this._toastNotificationService.success('You have been logout successfully.');
    this._router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return this._authService.isAuthenticated;
  }

}

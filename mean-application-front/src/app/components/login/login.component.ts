import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private _loginForm: FormGroup = this._formBuilder.group({});

  private _user: User = <User>{};

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _toastNotificationService: ToastNotificationService) {
    this._buildForm();
  }

  ngOnInit(): void {
  }

  private _buildForm() {
    this._loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onChange(event: Event) {
    event.preventDefault();

    const value = this._loginForm.getRawValue();
    this._user.username = value.username;
    this._user.password = value.password;
  }

  public onSubmit() {
    if (this._loginForm.valid) {
      this._authService.login(this._user).pipe(first()).subscribe((res: any) => {
        this._authService.initializeUser(res.token, res.user);
        this._router.navigate(['/home']);
      }, (err: HttpErrorResponse) => {
        this._toastNotificationService.error(err.error.msg);
        console.error(err);
      });
    }
  }

  get user(): User {
    return this._user;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

}

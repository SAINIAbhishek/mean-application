import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

const emailRegEx = /^[^\.][a-zA-Z\w\-.]{1,64}@{1}(?=[\w.\-])[\w.\-]+$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private _user: User = <User>{};

  private _registerForm: FormGroup = this._formBuilder.group({});

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _toastNotificationService: ToastNotificationService) {
    this._buildForm();
  }

  ngOnInit(): void {
  }

  private _buildForm() {
    this._registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
      password: ['', Validators.required]
    });
  }

  public onChange(event: Event) {
    event.preventDefault();

    const value = this._registerForm.getRawValue();
    this._user.name = value.name;
    this._user.username = value.username;
    this._user.email = value.email;
    this._user.password = value.password;
  }

  public onSubmit() {
    if (this._registerForm.valid) {
      this._authService.register(this._user).pipe(first()).subscribe((res: any) => {
        this._toastNotificationService.success(res.msg);
        this._registerForm.reset();
      }, (err: HttpErrorResponse) => {
        this._toastNotificationService.error(err.error.msg);
        console.error(err);
      });
    }
  }

  get user(): User {
    return this._user;
  }

  get registerForm(): FormGroup {
    return this._registerForm;
  }

}

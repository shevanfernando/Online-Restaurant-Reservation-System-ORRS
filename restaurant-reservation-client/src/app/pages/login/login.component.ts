import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserService, UserType } from '../../services/user.service';
import alert from 'sweetalert2';

declare function sign_up(): void;

declare function sign_in(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myScriptElement?: HTMLScriptElement;

  errorMessages: string | undefined;

  formSubmitInvalid: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.pattern(
          /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4}$/
        ),
      ]),
      nic: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m),
      ]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      usertype: new FormControl(UserType.CUSTOMER, [Validators.required]),
    },
    {
      validators: this.passwordConfirm,
    }
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = '../../assets/appJs/app.js';
    document.body.appendChild(this.myScriptElement);
  }

  signUp() {
    this.errorMessages = undefined;
    sign_up();
  }

  signIn() {
    this.errorMessages = undefined;
    sign_in();
  }

  onClickLogin() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe(
        () => {
          this.router.navigateByUrl('/reservation');
        },
        (err) => {
          this.errorMessages = err.error.message;
        }
      );
    } else {
      this.formSubmitInvalid = true;
      if (
        this.loginForm.controls.username.invalid &&
        this.loginForm.controls.password.invalid
      ) {
        this.errorMessages = 'All fields are required';
      } else if (this.loginForm.controls.username.invalid)
        this.errorMessages = 'Username is required';
      else if (this.loginForm.controls.password.invalid)
        this.errorMessages = 'Password is required';
    }
  }

  onClickSignUp() {
    if (this.registrationForm.valid) {
      this.userService.signUp(this.registrationForm.value).subscribe(
        () => {
          alert
            .fire('Customer registration successful!', undefined, 'success')
            .then((alertResult) => {
              this.router.navigateByUrl('/login');
            });
        },
        (err) => {
          alert.fire('Customer registration failed!', undefined, 'error');
          this.errorMessages = err.message;
        }
      );
    } else {
      if (
        this.registrationForm.controls.firstName.invalid &&
        this.registrationForm.controls.email.invalid &&
        this.registrationForm.controls.phoneNumber.invalid &&
        this.registrationForm.controls.nic.invalid &&
        this.registrationForm.controls.username.invalid &&
        this.registrationForm.controls.password.invalid &&
        this.registrationForm.controls.confirmPassword.invalid
      ) {
        this.errorMessages = 'All Fields are required';
      } else {
        if (this.registrationForm.controls.firstName.invalid) {
          this.errorMessages = 'First Name is required';
        }
        if (this.registrationForm.controls.email.invalid) {
          if (this.registrationForm.controls.firstName.errors?.email)
            this.errorMessages = 'Email is not valid.';

          this.errorMessages = 'Email is required';
        }
        if (this.registrationForm.controls.phoneNumber.invalid) {
          this.errorMessages = 'Phone Number is not valid.';
        }
        if (this.registrationForm.controls.nic.invalid) {
          if (this.registrationForm.controls.nic.errors?.pattern)
            this.errorMessages = 'NIC is not valid.';
          this.errorMessages = 'NIC is required.';
        }
        if (this.registrationForm.controls.username.invalid) {
          this.errorMessages = 'Username is required.';
        }
        if (this.registrationForm.controls.password.invalid) {
          this.errorMessages = 'Password is required.';
        }
        if (this.registrationForm.controls.confirmPassword.invalid) {
          this.errorMessages = 'Confirm Password is required.';
        }
      }
    }
  }

  onInputFieldsChange() {
    this.errorMessages = undefined;
  }

  passwordConfirm(form: AbstractControl): { invalid: boolean } {
    if (form.get('password')?.value === form.get('confirmPassword')?.value) {
      return { invalid: false };
    } else {
      this.errorMessages = 'Password and Confirm password are not matched';
      return { invalid: true };
    }
  }
}

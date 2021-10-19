import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

declare function sign_up(): void;

declare function sign_in(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myScriptElement?: HTMLScriptElement;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = '../../assets/appJs/app.js';
    document.body.appendChild(this.myScriptElement);
  }

  signUp() {
    sign_up();
  }

  signIn() {
    sign_in();
  }

  onClickLogin() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe((next) => {
        console.log('Save');
      });
    }
  }
}

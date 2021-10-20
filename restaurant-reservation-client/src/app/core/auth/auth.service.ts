import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';

export const userType = {
  CUSTOMER: 'CUSTOMER',
  RECEPTIONIST: 'RECEPTIONIST',
  WAITER: 'WAITER',
  ADMIN: 'ADMIN',
  CHEF: 'CHEF',
};

export type IUser = {
  name: string;
  userId?: string;
  staffId?: string;
  userType: typeof userType;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user = new BehaviorSubject<IUser | null>(null);

  private helper: JwtHelperService;

  constructor(private userService: UserService) {
    window.addEventListener('storage', this._storageEventListener.bind(this));
    this.helper = new JwtHelperService();
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      'storage',
      this._storageEventListener.bind(this)
    );
  }

  signIn(data: { username: string; password: string }): Observable<void> {
    return this.userService.signIn(data).pipe(
      map((res: string) => {
        localStorage.setItem('token', res);
        localStorage.setItem('login-event', 'login ' + Date.now());
        this.decodeToken();
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.user.next(null);
    localStorage.setItem('logout-event', 'logout ' + Date.now());
  }

  decodeToken(): void {
    const token = this.getToken();
    if (token) {
      const decodeData = this.helper.decodeToken(token);
      this.user.next(decodeData.data);
    }
  }

  isTokenExpired(): boolean | void {
    const token = this.getToken();
    if (token) return this.helper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private _storageEventListener(event: StorageEvent): void {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.user.next(null);
      }

      if (event.key === 'login-event') {
        location.reload();
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum StaffType {
  RECEPTIONIST = 'RECEPTIONIST',
  WAITER = 'WAITER',
  ADMIN = 'ADMIN',
  CHEF = 'CHEF',
}

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _API: string;

  constructor(private http: HttpClient) {
    this._API = `${environment.API}/user`;
  }

  signIn(data: { username: string; password: string }): Observable<string> {
    return this.http.post<string>(`${this._API}/login`, data);
  }

  signUp(data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
    username: string;
    password: string;
    userType: UserType;
    staffType?: StaffType;
  }): Observable<void> {
    if (data.userType === UserType.CUSTOMER) {
      return this.http.post<void>(`${this._API}/customer-registration`, {
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          nic: data.nic,
        },
        user: {
          username: data.username,
          password: data.password,
          user_type: data.userType,
        },
      });
    } else {
      return this.http.post<void>(`${this._API}/staff-registration`, {
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          nic: data.nic,
        },
        user: {
          username: data.username,
          password: data.password,
          user_type: data.userType,
        },
        staff_type: data.staffType,
      });
    }
  }
}

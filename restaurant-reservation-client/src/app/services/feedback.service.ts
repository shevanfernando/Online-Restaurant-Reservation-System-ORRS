import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FeedbackDTO } from '../feedback/feedback.component';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private _API: string;

  constructor(private http: HttpClient) {
    this._API = `${environment.API}/feedback`;
  }

  createNewFeedback(data: FeedbackDTO): Promise<any> {
    return this.http.post(`${this._API}/create-feedback`, data).toPromise();
  }
}

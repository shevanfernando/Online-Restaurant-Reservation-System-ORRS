import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import alert from 'sweetalert2';

export type FeedbackDTO = {
  level: {
    POOR: 'POOR';
    AVERAGE: 'AVERAGE';
    GOOD: 'GOOD';
  };
  feedback: string;
  type: {
    BUG: 'BUG';
    SUGGESTION: 'SUGGESTION';
    OTHER: 'OTHER';
  };
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  feedbackForm = new FormGroup({
    level: new FormControl('', Validators.required),
    feedback: new FormControl(''),
    type: new FormControl('', Validators.required),
  });

  constructor(private feedbackService: FeedbackService) {}

  onFeedbackSend() {
    if (this.feedbackForm.valid) {
      this.feedbackService
        .createNewFeedback(this.feedbackForm.value)
        .then((res) => {
          alert
            .fire('Thanks for your Feedback!', undefined, 'success')
            .then((alertResult) => {
              console.log(alertResult);
            });
        })
        .catch((err) => console.log(err));
    }
  }
}

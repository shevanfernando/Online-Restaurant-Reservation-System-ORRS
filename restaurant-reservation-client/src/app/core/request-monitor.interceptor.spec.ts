import { TestBed } from '@angular/core/testing';

import { RequestMonitorInterceptor } from './request-monitor.interceptor';

describe('RequestMonitorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestMonitorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestMonitorInterceptor = TestBed.inject(RequestMonitorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

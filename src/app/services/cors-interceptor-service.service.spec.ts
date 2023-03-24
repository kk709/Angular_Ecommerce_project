import { TestBed } from '@angular/core/testing';

import { CorsInterceptorServiceService } from './cors-interceptor-service.service';

describe('CorsInterceptorServiceService', () => {
  let service: CorsInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorsInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

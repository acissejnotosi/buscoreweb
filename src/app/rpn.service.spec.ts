import { TestBed, inject } from '@angular/core/testing';

import { RpnService } from './rpn.service';

describe('RpnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RpnService]
    });
  });

  it('should be created', inject([RpnService], (service: RpnService) => {
    expect(service).toBeTruthy();
  }));
});

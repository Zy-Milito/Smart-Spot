import { TestBed } from '@angular/core/testing';

import { ParkingFeeService } from './parking-fee.service';

describe('ParkingFeeService', () => {
  let service: ParkingFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

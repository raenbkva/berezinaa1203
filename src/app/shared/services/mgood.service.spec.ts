import { TestBed } from '@angular/core/testing';

import { MgoodService } from "./MgoodService";

describe('MgoodService', () => {
  let service: MgoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

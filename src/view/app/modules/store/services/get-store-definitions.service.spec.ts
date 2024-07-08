import { TestBed } from '@angular/core/testing';

import { GetStoreDefinitionsService } from './get-store-definitions.service';

describe('GetStoreDefinitionsService', () => {
  let service: GetStoreDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStoreDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

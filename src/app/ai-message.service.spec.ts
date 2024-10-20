import { TestBed } from '@angular/core/testing';

import { AiMessageService } from './ai-message.service';

describe('AiMessageService', () => {
  let service: AiMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMessageGenerationComponent } from './ai-message-generation.component';

describe('AiMessageGenerationComponent', () => {
  let component: AiMessageGenerationComponent;
  let fixture: ComponentFixture<AiMessageGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMessageGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMessageGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

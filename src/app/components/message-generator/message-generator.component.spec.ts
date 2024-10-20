import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGeneratorComponent } from './message-generator.component';

describe('MessageGeneratorComponent', () => {
  let component: MessageGeneratorComponent;
  let fixture: ComponentFixture<MessageGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsLogComponent } from './instructions-log.component';

describe('InstructionsLogComponent', () => {
  let component: InstructionsLogComponent;
  let fixture: ComponentFixture<InstructionsLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionsLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

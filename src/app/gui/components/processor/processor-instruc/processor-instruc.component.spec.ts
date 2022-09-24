import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorInstrucComponent } from './processor-instruc.component';

describe('ProcessorInstrucComponent', () => {
  let component: ProcessorInstrucComponent;
  let fixture: ComponentFixture<ProcessorInstrucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorInstrucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorInstrucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

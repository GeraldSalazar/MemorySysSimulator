import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimIndexComponent } from './sim-index.component';

describe('SimIndexComponent', () => {
  let component: SimIndexComponent;
  let fixture: ComponentFixture<SimIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

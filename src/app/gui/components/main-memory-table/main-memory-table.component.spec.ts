import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemoryTableComponent } from './main-memory-table.component';

describe('MainMemoryTableComponent', () => {
  let component: MainMemoryTableComponent;
  let fixture: ComponentFixture<MainMemoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMemoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheMemoryTableComponent } from './cache-memory-table.component';

describe('CacheMemoryTableComponent', () => {
  let component: CacheMemoryTableComponent;
  let fixture: ComponentFixture<CacheMemoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheMemoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheMemoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

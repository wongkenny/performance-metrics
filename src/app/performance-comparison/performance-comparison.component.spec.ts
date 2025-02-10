import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceComparisonComponent } from './performance-comparison.component';

describe('PerformanceComparisonComponent', () => {
  let component: PerformanceComparisonComponent;
  let fixture: ComponentFixture<PerformanceComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

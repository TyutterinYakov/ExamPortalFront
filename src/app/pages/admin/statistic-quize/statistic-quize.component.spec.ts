import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticQuizeComponent } from './statistic-quize.component';

describe('StatisticQuizeComponent', () => {
  let component: StatisticQuizeComponent;
  let fixture: ComponentFixture<StatisticQuizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticQuizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

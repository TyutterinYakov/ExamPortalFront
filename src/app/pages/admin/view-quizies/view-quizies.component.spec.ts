import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuiziesComponent } from './view-quizies.component';

describe('ViewQuiziesComponent', () => {
  let component: ViewQuiziesComponent;
  let fixture: ComponentFixture<ViewQuiziesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuiziesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuiziesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

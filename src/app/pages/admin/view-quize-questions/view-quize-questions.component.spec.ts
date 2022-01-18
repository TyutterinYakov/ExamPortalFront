import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizeQuestionsComponent } from './view-quize-questions.component';

describe('ViewQuizeQuestionsComponent', () => {
  let component: ViewQuizeQuestionsComponent;
  let fixture: ComponentFixture<ViewQuizeQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuizeQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuizeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

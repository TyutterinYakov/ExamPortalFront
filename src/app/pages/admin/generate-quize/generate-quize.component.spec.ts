import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQuizeComponent } from './generate-quize.component';

describe('GenerateQuizeComponent', () => {
  let component: GenerateQuizeComponent;
  let fixture: ComponentFixture<GenerateQuizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateQuizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

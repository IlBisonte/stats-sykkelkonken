import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultYouthComponent } from './result-youth.component';

describe('ResultYouthComponent', () => {
  let component: ResultYouthComponent;
  let fixture: ComponentFixture<ResultYouthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultYouthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

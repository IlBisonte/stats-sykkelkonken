import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMonumentsComponent } from './result-monuments.component';

describe('ResultMonumentsComponent', () => {
  let component: ResultMonumentsComponent;
  let fixture: ComponentFixture<ResultMonumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultMonumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMonumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

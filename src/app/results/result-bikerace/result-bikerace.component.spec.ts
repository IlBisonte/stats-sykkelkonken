import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBikeraceComponent } from './result-bikerace.component';

describe('ResultBikeraceComponent', () => {
  let component: ResultBikeraceComponent;
  let fixture: ComponentFixture<ResultBikeraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBikeraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBikeraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

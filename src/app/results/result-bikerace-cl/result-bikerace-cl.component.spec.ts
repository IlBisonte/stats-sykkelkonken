import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBikeraceClComponent } from './result-bikerace-cl.component';

describe('ResultBikeraceClComponent', () => {
  let component: ResultBikeraceClComponent;
  let fixture: ComponentFixture<ResultBikeraceClComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBikeraceClComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBikeraceClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

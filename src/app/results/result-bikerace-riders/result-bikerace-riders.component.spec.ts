import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBikeraceRidersComponent } from './result-bikerace-riders.component';

describe('ResultBikeraceRidersComponent', () => {
  let component: ResultBikeraceRidersComponent;
  let fixture: ComponentFixture<ResultBikeraceRidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBikeraceRidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBikeraceRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

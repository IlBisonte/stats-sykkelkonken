import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsResultPerBikeraceComponent } from './stats-result-per-bikerace.component';

describe('StatsResultPerBikeraceComponent', () => {
  let component: StatsResultPerBikeraceComponent;
  let fixture: ComponentFixture<StatsResultPerBikeraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsResultPerBikeraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsResultPerBikeraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

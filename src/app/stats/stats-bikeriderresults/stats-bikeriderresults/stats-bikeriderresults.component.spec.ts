import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBikeriderresultsComponent } from './stats-bikeriderresults.component';

describe('StatsBikeriderresultsComponent', () => {
  let component: StatsBikeriderresultsComponent;
  let fixture: ComponentFixture<StatsBikeriderresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBikeriderresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBikeriderresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

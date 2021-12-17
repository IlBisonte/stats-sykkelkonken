import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBikeraceVictoriesComponent } from './stats-bikerace-victories.component';

describe('StatsBikeraceVictoriesComponent', () => {
  let component: StatsBikeraceVictoriesComponent;
  let fixture: ComponentFixture<StatsBikeraceVictoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBikeraceVictoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBikeraceVictoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCompetitionteamBikeridersSankeyComponent } from './stats-competitionteam-bikeriders-sankey.component';

describe('StatsCompetitionteamBikeridersSankeyComponent', () => {
  let component: StatsCompetitionteamBikeridersSankeyComponent;
  let fixture: ComponentFixture<StatsCompetitionteamBikeridersSankeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsCompetitionteamBikeridersSankeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCompetitionteamBikeridersSankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

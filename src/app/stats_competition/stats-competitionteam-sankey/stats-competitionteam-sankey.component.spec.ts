import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCompetitionteamSankeyComponent } from './stats-competitionteam-sankey.component';

describe('StatsCompetitionteamSankeyComponent', () => {
  let component: StatsCompetitionteamSankeyComponent;
  let fixture: ComponentFixture<StatsCompetitionteamSankeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsCompetitionteamSankeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCompetitionteamSankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

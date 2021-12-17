import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCompetitionteamAlltimeComponent } from './stats-competitionteam-alltime.component';

describe('StatsCompetitionteamAlltimeComponent', () => {
  let component: StatsCompetitionteamAlltimeComponent;
  let fixture: ComponentFixture<StatsCompetitionteamAlltimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsCompetitionteamAlltimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCompetitionteamAlltimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsChampionsleagueAlltimeComponent } from './stats-championsleague-alltime.component';

describe('StatsChampionsleagueAlltimeComponent', () => {
  let component: StatsChampionsleagueAlltimeComponent;
  let fixture: ComponentFixture<StatsChampionsleagueAlltimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsChampionsleagueAlltimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsChampionsleagueAlltimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

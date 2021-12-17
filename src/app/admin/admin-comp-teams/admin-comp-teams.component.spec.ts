import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompTeamsComponent } from './admin-comp-teams.component';

describe('AdminCompTeamsComponent', () => {
  let component: AdminCompTeamsComponent;
  let fixture: ComponentFixture<AdminCompTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonplacementComponent } from './admin-seasonplacement.component';

describe('AdminSeasonplacementComponent', () => {
  let component: AdminSeasonplacementComponent;
  let fixture: ComponentFixture<AdminSeasonplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

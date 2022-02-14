import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminYouthComponent } from './admin-youth.component';

describe('AdminYouthComponent', () => {
  let component: AdminYouthComponent;
  let fixture: ComponentFixture<AdminYouthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminYouthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

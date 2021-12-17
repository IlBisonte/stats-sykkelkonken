import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalculationComponent } from './admin-calculation.component';

describe('AdminCalculationComponent', () => {
  let component: AdminCalculationComponent;
  let fixture: ComponentFixture<AdminCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

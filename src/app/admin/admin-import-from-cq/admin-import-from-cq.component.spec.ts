import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImportFromCqComponent } from './admin-import-from-cq.component';

describe('AdminImportFromCqComponent', () => {
  let component: AdminImportFromCqComponent;
  let fixture: ComponentFixture<AdminImportFromCqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImportFromCqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImportFromCqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

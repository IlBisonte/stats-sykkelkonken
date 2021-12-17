import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultClComponent } from './result-cl.component';

describe('ResultClComponent', () => {
  let component: ResultClComponent;
  let fixture: ComponentFixture<ResultClComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultClComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

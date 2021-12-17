import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBikeriderscoretotalComponent } from './stats-bikeriderscoretotal.component';

describe('StatsBikeriderscoretotalComponent', () => {
  let component: StatsBikeriderscoretotalComponent;
  let fixture: ComponentFixture<StatsBikeriderscoretotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBikeriderscoretotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBikeriderscoretotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBikeriderSankeyComponent } from './stats-bikerider-sankey.component';

describe('StatsBikeriderSankeyComponent', () => {
  let component: StatsBikeriderSankeyComponent;
  let fixture: ComponentFixture<StatsBikeriderSankeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBikeriderSankeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBikeriderSankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStopsComponent } from './history-stops.component';

describe('HistoryStopsComponent', () => {
  let component: HistoryStopsComponent;
  let fixture: ComponentFixture<HistoryStopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryStopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

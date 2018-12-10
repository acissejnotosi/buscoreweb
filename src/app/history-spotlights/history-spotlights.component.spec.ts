import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySpotlightsComponent } from './history-spotlights.component';

describe('HistorySpotlightsComponent', () => {
  let component: HistorySpotlightsComponent;
  let fixture: ComponentFixture<HistorySpotlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySpotlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySpotlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

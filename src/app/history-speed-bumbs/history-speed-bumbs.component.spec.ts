import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySpeedBumbsComponent } from './history-speed-bumbs.component';

describe('HistorySpeedBumbsComponent', () => {
  let component: HistorySpeedBumbsComponent;
  let fixture: ComponentFixture<HistorySpeedBumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySpeedBumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySpeedBumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

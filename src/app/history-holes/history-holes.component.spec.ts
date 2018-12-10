import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryHolesComponent } from './history-holes.component';

describe('HistoryHolesComponent', () => {
  let component: HistoryHolesComponent;
  let fixture: ComponentFixture<HistoryHolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryHolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryHolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

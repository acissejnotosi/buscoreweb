import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLineComponent } from './view-line.component';

describe('ViewLineComponent', () => {
  let component: ViewLineComponent;
  let fixture: ComponentFixture<ViewLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

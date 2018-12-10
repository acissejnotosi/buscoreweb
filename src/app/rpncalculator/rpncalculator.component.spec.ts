import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPNCalculatorComponent } from './rpncalculator.component';

describe('RPNCalculatorComponent', () => {
  let component: RPNCalculatorComponent;
  let fixture: ComponentFixture<RPNCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPNCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPNCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

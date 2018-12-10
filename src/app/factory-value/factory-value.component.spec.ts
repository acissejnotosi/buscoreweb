import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryValueComponent } from './factory-value.component';

describe('FactoryValueComponent', () => {
  let component: FactoryValueComponent;
  let fixture: ComponentFixture<FactoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

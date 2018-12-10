import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLineComponent } from './register-line.component';

describe('RegisterLineComponent', () => {
  let component: RegisterLineComponent;
  let fixture: ComponentFixture<RegisterLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

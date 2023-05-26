import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionPwdComponent } from './recuperacion-pwd.component';

describe('RecuperacionPwdComponent', () => {
  let component: RecuperacionPwdComponent;
  let fixture: ComponentFixture<RecuperacionPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperacionPwdComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

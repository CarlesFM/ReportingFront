import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHorasComponent } from './usuario-horas.component';

describe('UsuarioHorasComponent', () => {
  let component: UsuarioHorasComponent;
  let fixture: ComponentFixture<UsuarioHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

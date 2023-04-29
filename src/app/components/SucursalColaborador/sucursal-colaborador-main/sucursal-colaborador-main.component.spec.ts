import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalColaboradorMainComponent } from './sucursal-colaborador-main.component';

describe('SucursalColaboradorMainComponent', () => {
  let component: SucursalColaboradorMainComponent;
  let fixture: ComponentFixture<SucursalColaboradorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalColaboradorMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalColaboradorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

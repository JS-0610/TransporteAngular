import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalMainComponent } from './sucursal-main.component';

describe('SucursalMainComponent', () => {
  let component: SucursalMainComponent;
  let fixture: ComponentFixture<SucursalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

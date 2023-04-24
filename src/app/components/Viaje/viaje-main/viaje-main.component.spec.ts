import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeMainComponent } from './viaje-main.component';

describe('ViajeMainComponent', () => {
  let component: ViajeMainComponent;
  let fixture: ComponentFixture<ViajeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajeMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViajeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

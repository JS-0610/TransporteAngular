import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportistaMainComponent } from './transportista-main.component';

describe('TransportistaMainComponent', () => {
  let component: TransportistaMainComponent;
  let fixture: ComponentFixture<TransportistaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportistaMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportistaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

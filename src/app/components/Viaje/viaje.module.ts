import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { ViajeMainComponent } from './viaje-main/viaje-main.component';
import { AddModalComponent } from './add-modal/add-modal.component';



@NgModule({
  declarations: [
    TableListComponent,
    ViajeMainComponent,
    AddModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ViajeMainComponent
  ]
})
export class ViajeModule { }

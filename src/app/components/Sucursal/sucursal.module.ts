import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './add-modal/add-modal.component';
import { SucursalMainComponent } from './sucursal-main/sucursal-main.component';
import { TableListComponent } from './table-list/table-list.component';



@NgModule({
  declarations: [
    AddModalComponent,
    SucursalMainComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    SucursalMainComponent
  ]
})
export class SucursalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './add-modal/add-modal.component';
import { TableListComponent } from './table-list/table-list.component';
import { SucursalColaboradorMainComponent } from './sucursal-colaborador-main/sucursal-colaborador-main.component';



@NgModule({
  declarations: [
    AddModalComponent,
    TableListComponent,
    SucursalColaboradorMainComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    SucursalColaboradorMainComponent
  ]
})
export class SucursalColaboradorModule { }

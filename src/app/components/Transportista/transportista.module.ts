import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportistaMainComponent } from './transportista-main/transportista-main.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { TableListComponent } from './table-list/table-list.component';



@NgModule({
  declarations: [
    TransportistaMainComponent,
    AddModalComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    TransportistaMainComponent
  ]
})
export class TransportistaModule { }

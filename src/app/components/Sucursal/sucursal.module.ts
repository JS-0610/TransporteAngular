import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { SucursalMainComponent } from './components/sucursal-main/sucursal-main.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';



@NgModule({
  declarations: [
    AddModalComponent,
    SucursalMainComponent,
    TableListComponent,
    EditModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  exports:[
    SucursalMainComponent
  ]
})
export class SucursalModule { }

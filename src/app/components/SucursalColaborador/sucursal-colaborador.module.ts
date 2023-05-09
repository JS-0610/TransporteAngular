import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { SucursalColaboradorMainComponent } from './components/sucursal-colaborador-main/sucursal-colaborador-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';


@NgModule({
  declarations: [
    AddModalComponent,
    TableListComponent,
    SucursalColaboradorMainComponent,
    EditModalComponent,
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
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
  exports:[
    SucursalColaboradorMainComponent
  ]
})
export class SucursalColaboradorModule { }

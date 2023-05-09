import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';
import { ViajeMainComponent } from './components/viaje-main/viaje-main.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ViajeMainComponent,
    AddModalComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule,
    Ng2SearchPipeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxPaginationModule,
    NgbPaginationModule
  ],
  exports:[
    ViajeMainComponent
  ]
})
export class ViajeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReporteViajeMainComponent } from './components/reporte-viaje-main/reporte-viaje-main.component';
import { TableListViajeComponent } from './components/table-list-viaje/table-list-viaje.component';
import { TableListDetalleComponent } from './components/table-list-detalle/table-list-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
  declarations: [
    ReporteViajeMainComponent,
    TableListViajeComponent,
    TableListDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxMaskDirective,
    NgxMaskPipe,


  ],
  exports:[
    ReporteViajeMainComponent
  ]
})
export class ReporteViajeModule { }

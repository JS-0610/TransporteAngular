import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteViajeMainComponent } from './reporte-viaje-main/reporte-viaje-main.component';
import { ReporteViajeDetalladoComponent } from './reporte-viaje-detallado/reporte-viaje-detallado.component';
import { TableListViajeComponent } from './table-list-viaje/table-list-viaje.component';
import { TableListDetalleComponent } from './table-list-detalle/table-list-detalle.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReporteViajeMainComponent,
    ReporteViajeDetalladoComponent,
    TableListViajeComponent,
    TableListDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports:[

  ]
})
export class ReporteViajeModule { }

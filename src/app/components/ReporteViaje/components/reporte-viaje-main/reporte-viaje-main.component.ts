import { Component, OnInit } from '@angular/core';
import { DataForReporteViaje } from '../../models/reporte-viaje.model';

@Component({
  selector: 'app-reporte-viaje-main',
  templateUrl: './reporte-viaje-main.component.html',
  styleUrls: ['./reporte-viaje-main.component.css']
})
export class ReporteViajeMainComponent {

  datosDelViajeSeleccionado:DataForReporteViaje = {
    transportista_Id: 0,
    fechaInicio: new Date(0),
    fechaFinal: new Date(0),
  };
  viajeSelecccionadoId:number = 0;
  verDetalle:boolean = false;

  getDataFromViaje(data:DataForReporteViaje){
    this.datosDelViajeSeleccionado = data;
    console.log(data);
  }

  getViajeId(data:number){
    this.viajeSelecccionadoId = data;
  }

}

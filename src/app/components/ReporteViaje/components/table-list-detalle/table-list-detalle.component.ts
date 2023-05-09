import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReporteViajeService } from '../../services/reporte-viaje.service';
import { DataForReporteViaje, ViajeDetalleReporte } from '../../models/reporte-viaje.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reporteviaje-table-list-detalle',
  templateUrl: './table-list-detalle.component.html',
  styleUrls: ['./table-list-detalle.component.css']
})
export class TableListDetalleComponent implements OnInit,OnDestroy {

  constructor(private ViajeServices:ReporteViajeService){}

  ngOnInit(): void {
    if(this.viajeID===0){
      this.VerDetalle.emit(false);
    }
    this.ListaSuscripciones.push(this.ViajeServices.getReporteDetalle(this.viajeID).subscribe(res =>{
      this.listadoViajeDetalle = res;
    },
    error => {
      if (error.status != 200) {
        if(error.statusText.toString().includes('Unknown Error')){
          error.error = 'Fallo en la conexión';
        }
        Swal.fire(
          '¡Error!',
          '¡' + error.error + '!',
          'warning'
        );
      }
    }));
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  @Input() viajeID:number = 0;
  @Input() dataFromViaje:DataForReporteViaje ={
    transportista_Id: 0,
    fechaInicio: new Date(0),
    fechaFinal: new Date(0),
  };

  @Output() VerDetalle = new EventEmitter<boolean>();
  @Output() datosViaje = new EventEmitter<DataForReporteViaje>();

  listadoViajeDetalle:ViajeDetalleReporte[]=[];
  private ListaSuscripciones: Subscription[] = [];

  keyForSort:string = 'primerNombre';
  reverseForSort:boolean = false;
  sort(key:string){
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }
  paginationNumber:number = 1;
  searchText:any;

  changeVerDetalle(){
    this.VerDetalle.emit(false);
    this.datosViaje.emit(this.dataFromViaje);
  }

}

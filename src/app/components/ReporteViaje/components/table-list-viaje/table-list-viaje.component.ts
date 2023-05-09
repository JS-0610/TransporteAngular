import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReporteViajeService } from '../../services/reporte-viaje.service';
import { DataForReporteViaje, ViajeReporte } from '../../models/reporte-viaje.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ViajeService } from 'src/app/components/Viaje/services/viaje.service';
import { nameTransportista } from 'src/app/components/Viaje/models/viaje.model';
import { outputAst } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reporteviaje-table-list-viaje',
  templateUrl: './table-list-viaje.component.html',
  styleUrls: ['./table-list-viaje.component.css']
})
export class TableListViajeComponent implements OnInit,OnDestroy {

  constructor(private ViajeReporteServices:ReporteViajeService, private FormBuilder:FormBuilder, private ViajeService:ViajeService){
    this.ListaSuscripciones.push(this.ViajeService.getNombreTransportistas().subscribe(res=>{
      this.listadoNombreTransportista = res.sort((a, b) => a.primerNombre.localeCompare(b.primerNombre));
    }));
  }

  ngOnInit(): void {
    this.dataForViajeForm = this.FormBuilder.group({
      transportista_Id: new FormControl('',Validators.required),
      fechaInicio: new FormControl('',Validators.required),
      fechaFinal: new FormControl('',Validators.required),
    });
    if(this.dataOfViaje.transportista_Id!==0){
      this.dataForViajeForm.patchValue({
        transportista_Id: this.dataOfViaje.transportista_Id,
        fechaInicio: this.dataOfViaje.fechaInicio,
        fechaFinal:this.dataOfViaje.fechaFinal
      });
      this.getViajes(this.dataForViajeForm.value);
    }
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  @Input() dataOfViaje:DataForReporteViaje = {
    transportista_Id: 0,
    fechaInicio: new Date(0),
    fechaFinal: new Date(0),
  };

  @Output() dataFromViaje = new EventEmitter<DataForReporteViaje>();
  @Output() ViajeId = new EventEmitter<number>();
  @Output() verViajeDetalles = new EventEmitter<boolean>();

  dataForViajeForm!: FormGroup;
  listadoViaje:ViajeReporte[]=[];
  listadoNombreTransportista:nameTransportista[]=[];
  private ListaSuscripciones: Subscription[] = [];
  PagoTotalRangoFecha:number = 0;

  paginationNumber:number = 1;
  searchText:any;
  keyForSort:string = 'fecha';
  reverseForSort:boolean = false;
  sort(key:string){
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }

  getViajes(body:DataForReporteViaje){
    this.PagoTotalRangoFecha = 0;
    this.ListaSuscripciones.push(this.ViajeReporteServices.getReporteViajes(body).subscribe(res =>{
      this.listadoViaje = res;
      res.forEach(x => this.PagoTotalRangoFecha += x.pagoTransportista);
    }));
  }

  setDataDetalles(id:number){
    this.dataFromViaje.emit(this.dataForViajeForm.value);
    this.ViajeId.emit(id);
    this.verViajeDetalles.emit(true);
  }
}

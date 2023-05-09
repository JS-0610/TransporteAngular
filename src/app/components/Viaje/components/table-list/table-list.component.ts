import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SucursalColaborador } from 'src/app/components/SucursalColaborador/models/sucursal-colaborador.model';


@Component({
  selector: 'Viaje-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent{
    @Input() listadoColaboradorEnViaje:SucursalColaborador[] = [];
    @Input() sucursalSeleccionada:number = 0;

    keyForSort:string = 'nombreColaborador';
    reverseForSort:boolean = false;
    sort(key:string){
      this.keyForSort = key;
      this.reverseForSort = !this.reverseForSort;
    }
    page:number = 1;
    pageSize:number=5;
    searchText:any;

    @Output() dataColaboradorRemoveViaje = new EventEmitter<SucursalColaborador[]>();

    RemoverColaborador(colaborador:SucursalColaborador){

      this.listadoColaboradorEnViaje=this.listadoColaboradorEnViaje.filter(x=>x.sucursalColaborador_Id!==colaborador.sucursalColaborador_Id);
      this.dataColaboradorRemoveViaje.emit(this.listadoColaboradorEnViaje);
    }
}

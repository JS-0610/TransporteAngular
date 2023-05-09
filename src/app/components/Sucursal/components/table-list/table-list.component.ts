import { Component, OnDestroy } from '@angular/core';
import { Sucursal, deleteSucursal, updateSucursal } from '../../models/sucursal.model';
import { SucursalService } from '../../services/sucursal.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnDestroy{

  keyForSort:string = 'nombre';
  reverseForSort:boolean = false;
  sort(key:string){
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }

  paginationNumber:number = 1;

  searchText:any;

  listadoSucursales:Sucursal[]=[];
  private ListaSuscripciones: Subscription[]=[];

  constructor(private sucursalService:SucursalService){
    this.ListaSuscripciones.push(this.sucursalService.getSucursales().subscribe(res =>{
      this.listadoSucursales = res;
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
    this.ListaSuscripciones.push(this.sucursalService.reload$.subscribe(data => {
      this.dataReload();
    }));
  }


  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  delete(id: deleteSucursal) {
    Swal.fire({
      title: '¡Espere!',
      text: "¿Está seguro que desea eliminar la sucursal?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ListaSuscripciones.push(this.sucursalService.deleteSucursal(id).subscribe((res) => {
          if (res.includes('exito')) {
            Swal.fire(
              '¡Eliminado!',
              '¡Sucursal eliminada con éxito!',
              'success'
            );
            this.dataReload();
          }
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
          this.dataReload();
        }));
      }
    })
  }

  dataReload(): void {
    this.ListaSuscripciones.push(this.sucursalService.getSucursales().subscribe((res)=>{
      this.listadoSucursales = res;
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

  sendDataUpdate(sucursal: updateSucursal) {
    this.sucursalService.openEditModal$.next(sucursal);
  }


}

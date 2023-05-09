import { Component, OnDestroy } from '@angular/core';
import { SucursalColaborador, deleteSucursalColaborador, updateSucursalColaborador } from '../../models/sucursal-colaborador.model';
import Swal from 'sweetalert2';
import { SucursalColaboradorService } from '../../services/sucursal-colaborador.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-colaborador-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnDestroy {
  public listadoSucursalColaboradores: SucursalColaborador[] = [];
  private ListaSuscripciones: Subscription[]=[];

  keyForSort:string = 'nombreColaborador';
  reverseForSort:boolean = false;
  sort(key:string){
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }

  paginationNumber:number = 1;

  searchText:any;

  constructor(
    private SucursalColaboradorService: SucursalColaboradorService,
  ) {

    this.ListaSuscripciones.push(this.SucursalColaboradorService.reload$.subscribe(data => {
      this.dataReload();
    }));

    this.ListaSuscripciones.push(this.SucursalColaboradorService.getSucursalColaboradores().subscribe(res =>{
      this.listadoSucursalColaboradores = res;
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

  delete(id: deleteSucursalColaborador) {
    Swal.fire({
      title: '¡Espere!',
      text: "¿Está seguro que desea remover al colaborador de la sucursal?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ListaSuscripciones.push(this.SucursalColaboradorService.deleteSucursalColaborador(id).subscribe((res) => {
          if (res.includes('exito')) {
            Swal.fire(
              '¡Eliminado!',
              '¡Colaborador removido con éxito!',
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

  sendDataUpdate(SucursalColaborador: updateSucursalColaborador) {
    this.SucursalColaboradorService.openEditModal$.next(SucursalColaborador);
  }

  dataReload(): void {
    this.ListaSuscripciones.push(this.SucursalColaboradorService.getSucursalColaboradores().subscribe((res)=>{
      this.listadoSucursalColaboradores = res;
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

}

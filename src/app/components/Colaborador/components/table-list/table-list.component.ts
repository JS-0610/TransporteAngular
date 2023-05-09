import { Component, OnDestroy} from '@angular/core';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador, deleteColaborador, updateColaborador } from '../../models/colaborador.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'colaborador-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnDestroy {

  public listadoColaboradores: Colaborador[] = [];

  private ListaSuscripciones: Subscription[]=[];

  keyForSort:string = 'primerNombre';
  reverseForSort:boolean = false;
  sort(key:string){
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }

  paginationNumber:number = 1;

  searchText:any;

  delete(id: deleteColaborador) {
    Swal.fire({
      title: '¡Espere!',
      text: "¿Está seguro que desea eliminar al colaborador?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ListaSuscripciones.push(this.colaboradorService.DeleteColaborador(id).subscribe((res) => {
          if (res.includes('exito')) {
            Swal.fire(
              '¡Eliminado!',
              '¡Colaborador eliminado con éxito!',
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

  sendDataUpdate(colaborador: updateColaborador) {
    this.colaboradorService.openEditModal$.next(colaborador);
  }

  dataReload(): void {
    this.ListaSuscripciones.push(this.colaboradorService.getColaboradores().subscribe((res)=>{
      this.listadoColaboradores = res;
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

  constructor(
    private colaboradorService: ColaboradorService,
  ) {

    this.ListaSuscripciones.push(this.colaboradorService.reload$.subscribe(data => {
      this.dataReload();
    }));

    this.ListaSuscripciones.push(this.colaboradorService.getColaboradores().subscribe(res =>{
      this.listadoColaboradores = res;
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
}

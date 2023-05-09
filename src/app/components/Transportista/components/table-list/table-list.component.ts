import { Component, OnDestroy } from '@angular/core';
import { TransportistaService } from '../../services/transportista.service';
import { Transportista, deleteTransportista, updateTransportista } from '../../models/transportista.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'transportista-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnDestroy {

  constructor(
    private transportistaServices: TransportistaService,
  ) {

    this.ListaSuscripciones.push(this.transportistaServices.reload$.subscribe(data => {
      this.dataReload();
    }));

    this.ListaSuscripciones.push(this.transportistaServices.getTransportista().subscribe(res => {
      this.listadoTransportista = res;
    },
      error => {
        if (error.status != 200) {
          if (error.statusText.toString().includes('Unknown Error')) {
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

  public listadoTransportista: Transportista[] = [];
  private ListaSuscripciones: Subscription[] = [];

  keyForSort: string = 'primerNombre';
  reverseForSort: boolean = false;
  sort(key: string) {
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }

  paginationNumber: number = 1;
  searchText: any;


  delete(id: deleteTransportista) {
    Swal.fire({
      title: '¡Espere!',
      text: "¿Está seguro que desea eliminar al transportista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ListaSuscripciones.push(this.transportistaServices.deleteTransportista(id).subscribe((res) => {
          if (res.includes('exito')) {
            Swal.fire(
              '¡Eliminado!',
              '¡Transportista eliminado con éxito!',
              'success'
            );
            this.dataReload();
          }
        },
          error => {
            if (error.status != 200) {
              if (error.statusText.toString().includes('Unknown Error')) {
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

  sendDataUpdate(transportista: updateTransportista) {
    this.transportistaServices.openEditModal$.next(transportista);
  }

  dataReload(): void {
    this.ListaSuscripciones.push(this.transportistaServices.getTransportista().subscribe((res) => {
      this.listadoTransportista = res;
    },
      error => {
        if (error.status != 200) {
          if (error.statusText.toString().includes('Unknown Error')) {
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

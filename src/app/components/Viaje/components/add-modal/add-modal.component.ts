import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalColaborador } from 'src/app/components/SucursalColaborador/models/sucursal-colaborador.model';
import { SucursalColaboradorService } from 'src/app/components/SucursalColaborador/services/sucursal-colaborador.service';
import { ViajeService } from '../../services/viaje.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { nameSucursal } from '../../models/viaje.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'viaje-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent {
  constructor(
    private modalService: NgbModal,
    private FormBuilder: FormBuilder,
    private ViajeServices: ViajeService,
    private SucursalColaboradorServices: SucursalColaboradorService,
  ) {
    this.ListaSuscripciones.push(this.SucursalColaboradorServices.getNombreSucursales().subscribe(res => {
      this.listadoSucursales = res.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }));

  }

  ngOnInit(): void {
    this.SelectedSucursalForm = this.FormBuilder.group({
      sucursal_Id: new FormControl('', Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  listadoSucursal: SucursalColaborador[] = [];
  listadoSucursales: nameSucursal[] = [];
  private ListaSuscripciones: Subscription[] = [];
  SelectedSucursalForm!: FormGroup;
  keyForSort: string = 'nombreColaborador';
  reverseForSort: boolean = false;
  sort(key: string) {
    this.keyForSort = key;
    this.reverseForSort = !this.reverseForSort;
  }
  paginationNumberModal: number = 0;
  searchText: any;


  @Output() dataColaboradorAddViaje = new EventEmitter<SucursalColaborador>();
  @Output() changeSucursal = new EventEmitter<number>();

  AgregarViaje(data: SucursalColaborador) {
    this.dataColaboradorAddViaje.emit(data);
  }

  SelectedSucursal(data: nameSucursal) {
    this.ListaSuscripciones.push(this.ViajeServices.getSucursalColaboradores(data.sucursal_Id).subscribe(res => {
      this.listadoSucursal = res;
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
    this.changeSucursal.emit(data.sucursal_Id);
  }
  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'xl' });
  }

}

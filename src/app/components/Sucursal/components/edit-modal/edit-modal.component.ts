import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from '../../services/sucursal.service';
import { updateSucursal } from '../../models/sucursal.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy {

  sucursalForUpdate!: updateSucursal;
  private ListaSuscripciones: Subscription[] = [];
  UpdateSucursalForm!: FormGroup;

  @ViewChild('updateSucursalContent') updatecontent!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private FormBuilder: FormBuilder,
    private sucursalService: SucursalService
  ) { }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.UpdateSucursalForm = this.FormBuilder.group({
      sucursal_Id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
    this.ListaSuscripciones.push(this.sucursalService.openEditModal$.subscribe(data => {
      if (data.sucursal_Id != 0) {
        this.sucursalForUpdate = data;
        this.open();
      }
    }));
  }

  updateSucursal(data: updateSucursal) {
    this.ListaSuscripciones.push(this.sucursalService.updateSucursal(data).subscribe(res => {
      console.log(res.toString());
      if (res.includes('exito')) {
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Sucursal actualizada con éxito!',
          'success'
        );
        this.sucursalService.reload$.next(true);
        this.UpdateSucursalForm.reset();
        this.closeModal();
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
        this.sucursalService.reload$.next(true);
        this.UpdateSucursalForm.reset();
        this.closeModal();
      }));
  }

  open(): void {
    this.UpdateSucursalForm.patchValue({
      sucursal_Id: this.sucursalForUpdate.sucursal_Id,
      nombre: this.sucursalForUpdate.nombre,
      direccion: this.sucursalForUpdate.direccion,
    });
    this.modalService.open(this.updatecontent, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'm', keyboard: false });
  }

  closeModal(): void {
    let SucursalVacio: updateSucursal = {
      sucursal_Id: 0,
      nombre: '',
      direccion: '',
    };
    this.sucursalService.openEditModal$.next(SucursalVacio);
    this.modalService.dismissAll();
  }

}

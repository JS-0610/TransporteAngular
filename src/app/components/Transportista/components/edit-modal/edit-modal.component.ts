import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TransportistaService } from '../../services/transportista.service';
import { updateTransportista } from '../../models/transportista.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'transportista-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {

  constructor(
    private modalService: NgbModal,
    private FormBuilder: FormBuilder,
    private transporitstaService: TransportistaService
  ) {}

  ngOnInit(): void {
    this.updateTransportistaForm = this.FormBuilder.group({
      transportista_Id: new FormControl('', Validators.required),
      primerNombre: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
    });
    this.ListaSuscripciones.push(this.transporitstaService.openEditModal$.subscribe(data => {
      if (data.transportista_Id != 0) {
        this.TransportistaForUpdate = data;
        this.open();
      }
    }));
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  TransportistaForUpdate!: updateTransportista;
  private ListaSuscripciones: Subscription[]=[];

  @ViewChild('updateTransportistaContent') updatecontent!: TemplateRef<any>;
  updateTransportistaForm!: FormGroup;


  updateTransportista(data: updateTransportista) {
    this.ListaSuscripciones.push(this.transporitstaService.updateTransportista(data).subscribe(res => {
      if (res.includes('exito')) {
        Swal.fire(
          '¡Proceso Exitoso!',
          'Transportista actualizado con éxito!',
          'success'
        );
        this.transporitstaService.reload$.next(true);
        this.updateTransportistaForm.reset();
        this.closeModal();
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
        this.transporitstaService.reload$.next(true);
        this.updateTransportistaForm.reset();
        this.closeModal();
      }));
  }

  open(): void {
    this.modalService.open(this.updatecontent, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'm', keyboard: false });
    this.updateTransportistaForm.patchValue({
      transportista_Id: this.TransportistaForUpdate.transportista_Id,
      primerNombre: this.TransportistaForUpdate.primerNombre,
      fechaNacimiento: this.TransportistaForUpdate.fechaNacimiento.toString().substring(0, 10),
      telefono: this.TransportistaForUpdate.telefono,
      tarifa: this.TransportistaForUpdate.tarifa,
    });
  }

  closeModal():void{
    let TransportistaVacio: updateTransportista = {
      transportista_Id:0,
      primerNombre: '',
      fechaNacimiento: new Date(0),
      tarifa: 0,
      telefono: ''
    };
    this.transporitstaService.openEditModal$.next(TransportistaVacio);
    this.modalService.dismissAll();
  }


}

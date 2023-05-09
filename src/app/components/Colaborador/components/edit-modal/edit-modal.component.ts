import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { updateColaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../services/colaborador.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'Colaborador-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {

  updateColaboradorForm!: FormGroup;
  colaboradorForUpdate!: updateColaborador;
  private ListaSuscripciones: Subscription[]=[];

  @ViewChild('updatecontent') updatecontent!: TemplateRef<any>;

  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder, private colaboradorService: ColaboradorService) {

  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.updateColaboradorForm = this.FormBuilder.group({
      colaborador_Id: new FormControl('', Validators.required),
      primerNombre: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
    this.ListaSuscripciones.push(this.colaboradorService.openEditModal$.subscribe(data => {
      if (data.colaborador_Id != 0) {
        this.colaboradorForUpdate = data;
        this.open();
      }
    }));
  }

  updateColaborador(data: updateColaborador) {
    this.ListaSuscripciones.push(this.colaboradorService.updateColaborador(data).subscribe((res) => {
      if (res.includes('exito')) {
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Colaborador actualizado con éxito!',
          'success'
        );
        this.colaboradorService.reload$.next(true);
        this.updateColaboradorForm.reset();
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
        this.colaboradorService.reload$.next(true);
        this.updateColaboradorForm.reset();
        this.closeModal();
      }));
  }

  open(): void {
    this.modalService.open(this.updatecontent, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'm', keyboard: false });
    this.updateColaboradorForm.patchValue({
      colaborador_Id: this.colaboradorForUpdate.colaborador_Id,
      primerNombre: this.colaboradorForUpdate.primerNombre,
      primerApellido: this.colaboradorForUpdate.primerApellido,
      dni: this.colaboradorForUpdate.dni,
      fechaNacimiento: this.colaboradorForUpdate.fechaNacimiento.toString().substring(0, 10),
      direccion: this.colaboradorForUpdate.direccion,
      telefono: this.colaboradorForUpdate.telefono
    });
  }

  closeModal(): void {
    let colaboradorVacio: updateColaborador = {
      colaborador_Id:0,
      primerNombre: '',
      primerApellido: '',
      dni: '',
      fechaNacimiento: new Date(0),
      direccion: '',
      telefono: ''
    };
    this.colaboradorService.openEditModal$.next(colaboradorVacio);
    this.modalService.dismissAll();
  }
}

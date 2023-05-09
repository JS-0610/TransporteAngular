import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { updateSucursalColaborador } from '../../models/sucursal-colaborador.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalColaboradorService } from '../../services/sucursal-colaborador.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-colaborador-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {

  sucursalColaboradorForUpdate!: updateSucursalColaborador;
  private ListaSuscripciones: Subscription[]=[];

  @ViewChild('updateSucursalColaboradorContent') updatecontent!: TemplateRef<any>;
  updateSucursalColaboradorForm!: FormGroup;

  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder, private SucursalColaboradorService: SucursalColaboradorService) {

  }

  ngOnInit(): void {
    this.updateSucursalColaboradorForm = this.FormBuilder.group({
      sucursalColaborador_Id:new FormControl('',Validators.required),
      distancia:new FormControl('',Validators.required)
    });
    this.ListaSuscripciones.push(this.SucursalColaboradorService.openEditModal$.subscribe(data => {
      if (data.sucursalColaborador_Id != 0) {
        this.sucursalColaboradorForUpdate = data;
        this.open();
      }
    }));
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  updateSucursalColaborador(data: updateSucursalColaborador) {
    this.ListaSuscripciones.push(this.SucursalColaboradorService.updateSucursalColaborador(data).subscribe(res => {
      console.log(res.toString());
      if (res.includes('exito')) {
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Distancia actualizada con éxito!',
          'success'
        );
        this.SucursalColaboradorService.reload$.next(true);
        this.updateSucursalColaboradorForm.reset();
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
        this.SucursalColaboradorService.reload$.next(true);
        this.updateSucursalColaboradorForm.reset();
        this.closeModal();
      }));
  }

  open(): void {
    this.modalService.open(this.updatecontent, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'm', keyboard: false });
    this.updateSucursalColaboradorForm.patchValue({
      sucursalColaborador_Id: this.sucursalColaboradorForUpdate.sucursalColaborador_Id,
      distancia: this.sucursalColaboradorForUpdate.distancia
    });
  }

  closeModal():void{
    let SucursalColaboradorVacio: updateSucursalColaborador = {
      sucursalColaborador_Id: 0,
      distancia: 0
    };
    this.SucursalColaboradorService.openEditModal$.next(SucursalColaboradorVacio);
    this.modalService.dismissAll();
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addColaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../services/colaborador.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'colaborador-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit,OnDestroy {

  AddColaboradorForm!:FormGroup;
  private ListaSuscripciones: Subscription[]=[];

  constructor(private modalService: NgbModal,private FormBuilder:FormBuilder,private colaboradorService: ColaboradorService) {

  }
  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x=>x.unsubscribe());
  }

  ngOnInit(): void {
    this.AddColaboradorForm = this.FormBuilder.group({
      primerNombre: new FormControl('',Validators.required),
      primerApellido: new FormControl('',Validators.required),
      dni: new FormControl('',Validators.required),
      fechaNacimiento: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
    })
  }

  addColaborador(data:addColaborador){
    this.ListaSuscripciones.push(
    this.colaboradorService.addColaborador(data).subscribe((res)=>{
      if(res.includes('exito')){
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Colaborador agregado con éxito!',
          'success'
        )
        this.colaboradorService.reload$.next(true);
        this.AddColaboradorForm.reset();
        this.modalService.dismissAll();
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
      this.AddColaboradorForm.reset();
      this.modalService.dismissAll();
    }));
  }

  open(content:any):void {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'m',keyboard:false });
	}


}

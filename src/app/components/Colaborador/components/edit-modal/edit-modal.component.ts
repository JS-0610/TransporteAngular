import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { updateColaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../services/colaborador.service';


@Component({
  selector: 'Colaborador-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  updateColaboradorForm!:FormGroup;

  @ViewChild('updatecontent') updatecontent!: TemplateRef<any>;

  constructor(private modalService: NgbModal,private FormBuilder:FormBuilder,private colaboradorService: ColaboradorService) {
    this.colaboradorService.openEditModal$.subscribe(data =>{
        if(data.colaborador_Id!=0){
          this.colaboradorForUpdate = data;
          this.open();
        }
    });
  }

  ngOnInit(): void {
    this.updateColaboradorForm = this.FormBuilder.group({
      colaborador_Id: new FormControl('',Validators.required),
      primerNombre: new FormControl('',Validators.required),
      primerApellido: new FormControl('',Validators.required),
      dni: new FormControl('',Validators.required),
      fechaNacimiento: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
    })
  }

  updateColaborador(data:updateColaborador){
    this.colaboradorService.updateColaborador(data).subscribe((res)=>{
      if(res.status == 200){
        console.log("Se hizo con exito");

      }
      this.colaboradorService.reload$.next(true);
      this.updateColaboradorForm.reset();
      this.modalService.dismissAll();
    });
  }
colaboradorForUpdate!:updateColaborador;

  open():void {
		this.modalService.open(this.updatecontent, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'m',keyboard:false });
    this.updateColaboradorForm.patchValue({
      colaborador_Id: this.colaboradorForUpdate.colaborador_Id,
      primerNombre: this.colaboradorForUpdate.primerNombre,
      primerApellido: this.colaboradorForUpdate.primerApellido,
      dni: this.colaboradorForUpdate.dni,
      fechaNacimiento: this.colaboradorForUpdate.fechaNacimiento.toString().substring(0,10),
      direccion: this.colaboradorForUpdate.direccion,
      telefono: this.colaboradorForUpdate.telefono
    });
	}


}

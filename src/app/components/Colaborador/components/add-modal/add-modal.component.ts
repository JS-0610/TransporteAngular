import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colaborador, addColaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
  selector: 'colaborador-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  AddColaboradorForm!:FormGroup;

  reloadDataColaborador!:void;

  constructor(private modalService: NgbModal,private FormBuilder:FormBuilder,private colaboradorService: ColaboradorService) {

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
    this.colaboradorService.addColaborador(data).subscribe((res)=>{

      this.colaboradorService.reload$.next(true);
      this.AddColaboradorForm.reset();
      this.modalService.dismissAll();
    });
  }

  open(content:any):void {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'m',keyboard:false });
	}


}

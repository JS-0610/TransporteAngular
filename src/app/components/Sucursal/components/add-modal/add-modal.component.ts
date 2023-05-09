import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from '../../services/sucursal.service';
import { addSucursal } from '../../models/sucursal.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit,OnDestroy {
  AddSucursalForm!:FormGroup;
  private ListaSuscripciones: Subscription[]=[];

  constructor(private modalService: NgbModal,private FormBuilder:FormBuilder,private sucursalService: SucursalService) {}

  ngOnInit(): void {
    this.AddSucursalForm = this.FormBuilder.group({
      nombre : new FormControl('',Validators.required),
      direccion : new FormControl('',Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  open(content:any):void {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'m' });
	}

  addSucursal(data:addSucursal){
    this.ListaSuscripciones.push(this.sucursalService.addSucursal(data).subscribe(res=>{
      if(res.includes("exito")){
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Sucursal agregada con éxito!',
          'success'
        );
        this.sucursalService.reload$.next(true);
        this.AddSucursalForm.reset();
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
      this.sucursalService.reload$.next(true);
      this.AddSucursalForm.reset();
      this.modalService.dismissAll();
    }));
  }
}


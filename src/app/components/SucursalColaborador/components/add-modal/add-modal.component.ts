import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalColaboradorService } from '../../services/sucursal-colaborador.service';
import { addSucursalColaborador, nameColaborador, nameSucursal } from '../../models/sucursal-colaborador.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sucursal-colaborador-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit,OnDestroy {
  constructor(private modalService: NgbModal,private FormBuilder:FormBuilder,private sucursalColaboradorService: SucursalColaboradorService) {
    this.ListaSuscripciones.push(this.sucursalColaboradorService.getNombreColaboradores().subscribe(res=>{
      this.nombresColaboradores = res.sort((a, b) => a.primerNombre.localeCompare(b.primerNombre));
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
    }));

    this.ListaSuscripciones.push(this.sucursalColaboradorService.getNombreSucursales().subscribe(res=>{
      this.nombresSucursales = res.sort((a, b) => a.nombre.localeCompare(b.nombre));
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
    }));
  }
  ngOnInit(): void {
    this.addSucursalColaboradorForm = this.FormBuilder.group({
      colaborador_Id: new FormControl('',Validators.required),
      sucursal_Id: new FormControl('',Validators.required),
      distancia: new FormControl('',Validators.required),
    })
  }
  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  private ListaSuscripciones: Subscription[]=[];

  addSucursalColaboradorForm!: FormGroup;
  nombresColaboradores:nameColaborador[]=[];
  nombresSucursales:nameSucursal[]=[];

  addSucursalColaborador(data:addSucursalColaborador){
    this.ListaSuscripciones.push(this.sucursalColaboradorService.addSucursalColaborador(data).subscribe(res=>{
      if(res.includes("exito")){
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Colaborador agregado a la sucursal con éxito!',
          'success'
        );
        this.sucursalColaboradorService.reload$.next(true);
        this.addSucursalColaboradorForm.reset();
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
      this.sucursalColaboradorService.reload$.next(true);
      this.addSucursalColaboradorForm.reset();
      this.modalService.dismissAll();
    }));
  }

  open(content:any):void {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'lg' });
	}
}

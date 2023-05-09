import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportistaService } from '../../services/transportista.service';
import Swal from 'sweetalert2';
import { addTransportista } from '../../models/transportista.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'transportista-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    private FormBuilder: FormBuilder,
    private transportistaService: TransportistaService
  ) { }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.AddTransportistaForm = this.FormBuilder.group({
      primerNombre: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required)
    })
  }

  AddTransportistaForm!: FormGroup;
  private ListaSuscripciones: Subscription[] = [];

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'm' });
  }

  addTransportista(data: addTransportista) {
    this.ListaSuscripciones.push(this.transportistaService.addTransportista(data).subscribe(res => {
      if (res.includes("exito")) {
        Swal.fire(
          '¡Proceso Exitoso!',
          'Transportista agregado con éxito!',
          'success'
        );
        this.transportistaService.reload$.next(true);
        this.AddTransportistaForm.reset();
        this.modalService.dismissAll();
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
        this.transportistaService.reload$.next(true);
        this.AddTransportistaForm.reset();
        this.modalService.dismissAll();
      }));
  }
}

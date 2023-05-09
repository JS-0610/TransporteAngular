import { Component, Input, OnInit } from '@angular/core';
import { SucursalColaborador } from 'src/app/components/SucursalColaborador/models/sucursal-colaborador.model';
import Swal from 'sweetalert2';
import { addViaje, detalle, nameTransportista } from '../../models/viaje.model';
import { ViajeService } from '../../services/viaje.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viaje-main',
  templateUrl: './viaje-main.component.html',
  styleUrls: ['./viaje-main.component.css']
})
export class ViajeMainComponent implements OnInit {

  listadoColaboradorEnViaje: SucursalColaborador[] = [];
  listadoSucursalid: detalle[] = [];
  listadoNombreTransportista: nameTransportista[] = [];
  private ListaSuscripciones: Subscription[] = [];

  sucursalID: number = 0;
  transportistaID: number = 0;
  SelectTransportistaForm!: FormGroup;

  constructor(private ViajeService: ViajeService, private FormBuilder: FormBuilder) {
    this.ListaSuscripciones.push(this.ViajeService.getNombreTransportistas().subscribe(res => {
      this.listadoNombreTransportista = res.sort((a, b) => a.primerNombre.localeCompare(b.primerNombre));
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
      }));
  }

  ngOnInit(): void {
    this.SelectTransportistaForm = this.FormBuilder.group({
      transportista_Id: new FormControl('', Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.ListaSuscripciones.forEach(x => x.unsubscribe());
  }

  ColaboradoresEnViaje(data: SucursalColaborador) {
    if (this.listadoColaboradorEnViaje.some(c => c.sucursalColaborador_Id === data.sucursalColaborador_Id)) {
      Swal.fire(
        '¡Cuidado!',
        '¡El colaborador ya esta agregado al viaje!',
        'warning'
      );
      return;
    }
    this.listadoColaboradorEnViaje.push(data);
  }

  ColaboradorRemoveViaje(data: SucursalColaborador[]) {
    this.listadoColaboradorEnViaje = data;
  }

  CambioSucursal(dato: number) {
    if (this.sucursalID !== dato) {
      this.listadoColaboradorEnViaje = [];
    }
    this.sucursalID = dato;
  }

  RegistrarViaje() {
    for (let colaborador of this.listadoColaboradorEnViaje) {
      let detalle: detalle = {
        sucursalColaborador_Id: colaborador.sucursalColaborador_Id
      };
      this.listadoSucursalid.push(detalle);
    }
    this.transportistaID = this.SelectTransportistaForm.value.transportista_Id;
    if (this.transportistaID <= 0) {
      Swal.fire(
        '¡Error!',
        '¡No ha seleccionado un transportista!',
        'warning'
      );
      return;
    }
    if (this.listadoSucursalid.length <= 0) {
      Swal.fire(
        '¡Error!',
        '¡No ha agregado colaboradores al viaje!',
        'warning'
      );
      return;
    }
    if (this.sucursalID <= 0) {
      Swal.fire(
        '¡Error!',
        '¡No ha agregado colaboradores al viaje!',
        'warning'
      );
      return;
    }
    let Viaje: addViaje = {
      transportista_Id: this.transportistaID,
      sucursal_Id: this.sucursalID,
      viajesDetalle: this.listadoSucursalid
    };
    this.ListaSuscripciones.push(this.ViajeService.addViaje(Viaje).subscribe(res => {
      if (res.includes("exito")) {
        Swal.fire(
          '¡Proceso Exitoso!',
          '¡Viaje registrado con éxito!',
          'success'
        );
        this.listadoColaboradorEnViaje = [];
        this.sucursalID = 0;
        this.transportistaID = 0;
        this.listadoSucursalid = [];
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
      }));
  }



}

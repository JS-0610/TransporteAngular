import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/app/enviroment/enviroment';
import { Colaborador, addColaborador, deleteColaborador, updateColaborador } from '../models/colaborador.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(
    private http: HttpClient
  ) { }

  getColaboradores(){

    return this.http.get<Colaborador[]>(environment.Colaborador);

  }

  addColaborador(body: addColaborador) {
    return this.http.post(environment.Colaborador, body,{responseType:'text'});
  }

  updateColaborador(body: updateColaborador) {
    return this.http.put(environment.Colaborador, body,{responseType:'text'});
  }

  DeleteColaborador(body: deleteColaborador) {
    return this.http.request('delete',environment.Colaborador,{body:body,responseType:'text'});
  }

  reload$ = new BehaviorSubject<boolean>(false);

  colaboradorVacio: updateColaborador = {
    colaborador_Id:0,
    primerNombre: '',
    primerApellido: '',
    dni: '',
    fechaNacimiento: new Date(0),
    direccion: '',
    telefono: ''
  };

  openEditModal$ = new BehaviorSubject<updateColaborador>(this.colaboradorVacio);
}


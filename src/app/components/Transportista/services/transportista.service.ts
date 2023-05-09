import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';
import { Transportista, addTransportista, updateTransportista, deleteTransportista } from '../models/transportista.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {

  constructor(private http:HttpClient) { }

  getTransportista(){
    return this.http.get<Transportista[]>(environment.Transportista);
  }

  addTransportista(body:addTransportista){
    return this.http.post(environment.Transportista,body,{responseType:'text'});
  }

  updateTransportista(body:updateTransportista){
    return this.http.put(environment.Transportista,body,{responseType: 'text'});
  }

  deleteTransportista(body:deleteTransportista){
    return this.http.request('delete',environment.Transportista,{body:body,responseType:'text'});
  }

  reload$ = new BehaviorSubject<boolean>(false);

  TransportistaVacio: updateTransportista = {
    transportista_Id:0,
    primerNombre: '',
    fechaNacimiento: new Date(0),
    tarifa: 0,
    telefono: ''
  };

  openEditModal$ = new BehaviorSubject<updateTransportista>(this.TransportistaVacio);
}

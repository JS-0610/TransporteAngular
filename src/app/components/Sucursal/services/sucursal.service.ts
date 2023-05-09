import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';
import { Sucursal, updateSucursal, addSucursal, deleteSucursal } from '../models/sucursal.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient) {

  }

  getSucursales(){
    return this.http.get<Sucursal[]>(environment.Sucursal);
  }

  addSucursal(body:addSucursal){
    return this.http.post(environment.Sucursal,body,{responseType: 'text'});
  }

  updateSucursal(body:updateSucursal){
    return this.http.put(environment.Sucursal,body,{responseType: 'text'});
  }

  deleteSucursal(body:deleteSucursal){
    return this.http.request('delete',environment.Sucursal,{body:body,responseType:'text'});
  }

  reload$ = new BehaviorSubject<boolean>(false);

  SucursalVacio: updateSucursal = {
    sucursal_Id:0,
    nombre: '',
    direccion: '',
  };

  openEditModal$ = new BehaviorSubject<updateSucursal>(this.SucursalVacio);
}

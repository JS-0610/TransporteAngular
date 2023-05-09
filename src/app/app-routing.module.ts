import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajeMainComponent } from './components/Viaje/components/viaje-main/viaje-main.component';
import { ColaboradorMainComponent } from './components/Colaborador/components/colaborador-main/colaborador-main.component';
import { SucursalColaboradorMainComponent } from './components/SucursalColaborador/components/sucursal-colaborador-main/sucursal-colaborador-main.component';
import { SucursalMainComponent } from './components/Sucursal/components/sucursal-main/sucursal-main.component';
import { TransportistaMainComponent } from './components/Transportista/components/transportista-main/transportista-main.component';
import { ReporteViajeMainComponent } from './components/ReporteViaje/components/reporte-viaje-main/reporte-viaje-main.component';

const routes: Routes = [
  {path:'',redirectTo:'Viaje',pathMatch:'full'},
  {path:'Viaje',component:ViajeMainComponent,pathMatch:'full'},
  {path:'Colaboradores',component:ColaboradorMainComponent},
  {path:'Sucursales',component:SucursalMainComponent},
  {path:'Transportistas',component:TransportistaMainComponent},
  {path:'AsignarSucursal',component:SucursalColaboradorMainComponent},
  {path:'ReporteViaje',component:ReporteViajeMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

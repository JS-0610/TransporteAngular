import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajeMainComponent } from './components/Viaje/viaje-main/viaje-main.component';
import { ColaboradorMainComponent } from './components/Colaborador/components/colaborador-main/colaborador-main.component';
import { SucursalColaboradorMainComponent } from './components/SucursalColaborador/sucursal-colaborador-main/sucursal-colaborador-main.component';
import { SucursalMainComponent } from './components/Sucursal/sucursal-main/sucursal-main.component';
import { ReporteViajeMainComponent } from './components/ReporteViaje/reporte-viaje-main/reporte-viaje-main.component';
import { ReporteViajeDetalladoComponent } from './components/ReporteViaje/reporte-viaje-detallado/reporte-viaje-detallado.component';

const routes: Routes = [
  {path:'',redirectTo:'Viaje',pathMatch:'full'},
  {path:'Viaje',component:ViajeMainComponent,pathMatch:'full'},
  {path:'Colaboradores',component:ColaboradorMainComponent},
  {path:'Sucursales',component:SucursalMainComponent},
  {path:'AsignarSucursal',component:SucursalColaboradorMainComponent},
  {path:'ReporteViaje',component:ReporteViajeMainComponent},
  {path:'ViajeDetalle',component:ReporteViajeDetalladoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

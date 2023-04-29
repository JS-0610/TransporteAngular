import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViajeModule } from './components/Viaje/viaje.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorModule } from './components/Colaborador/colaborador.module';
import { SucursalModule } from './components/Sucursal/sucursal.module';
import { SucursalColaboradorModule } from './components/SucursalColaborador/sucursal-colaborador.module';
import { TransportistaModule } from './components/Transportista/transportista.module';
import { ReporteViajeModule } from './components/ReporteViaje/reporte-viaje.module';
import { SidebarModule } from './components/Sidebar/sidebar.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViajeModule,
    ColaboradorModule,
    SucursalModule,
    SucursalColaboradorModule,
    TransportistaModule,
    ReporteViajeModule,
    SidebarModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

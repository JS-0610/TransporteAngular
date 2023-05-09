import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonoPipe } from './telefono.pipe';
import { DniPipe } from './dni.pipe';



@NgModule({
  declarations: [
    TelefonoPipe,
    DniPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TelefonoPipe,
    DniPipe
  ]
})
export class PipesModule { }

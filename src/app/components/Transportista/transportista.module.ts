import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportistaMainComponent } from './components/transportista-main/transportista-main.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    TransportistaMainComponent,
    AddModalComponent,
    TableListComponent,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PipesModule
  ],
  providers: [
    provideNgxMask()
  ],
  exports:[
    TransportistaMainComponent
  ]
})
export class TransportistaModule { }

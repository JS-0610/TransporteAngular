import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ColaboradorMainComponent } from './components/colaborador-main/colaborador-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';




@NgModule({
  declarations: [
    TableListComponent,
    AddModalComponent,
    ColaboradorMainComponent,
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
  exports: [
    ColaboradorMainComponent
  ]
})
export class ColaboradorModule { }

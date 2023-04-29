import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ColaboradorMainComponent } from './components/colaborador-main/colaborador-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';




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
    NgbTypeaheadModule,
    RouterModule
  ],
  providers: [DecimalPipe],
  exports: [
    ColaboradorMainComponent
  ]
})
export class ColaboradorModule { }

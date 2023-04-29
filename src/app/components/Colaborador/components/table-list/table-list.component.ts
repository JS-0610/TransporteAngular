import { Component,EventEmitter,Output,PipeTransform } from '@angular/core';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador, updateColaborador} from '../../models/colaborador.model';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable} from 'rxjs';
import { map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'colaborador-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent {

  public listadoColaboradores: Colaborador[] = [];
  observable$: Observable<Colaborador[]>;
  filter = new FormControl('', { nonNullable: true });
  pipes:DecimalPipe;

  search(text: string, pipe: PipeTransform): Colaborador[] {
    return this.listadoColaboradores.filter((colaborador) => {
      const term = text.toLowerCase();
      return (
        colaborador.primerNombre.toLowerCase().includes(term) ||
        colaborador.primerApellido.toLowerCase().includes(term) ||
        colaborador.direccion.toLowerCase().includes(term) ||
        pipe.transform(colaborador.dni).includes(term)
      )
    });
  }

  delete(id: number) {
    this.colaboradorService.DeleteColaborador(id)
    .pipe(
      switchMap(() => this.colaboradorService.getColaboradores())
    )
    .subscribe((resp) => {
      this.listadoColaboradores = resp;
      this.observable$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text, this.pipes)),
      );
    });
  }


  sendDataUpdate(colaborador:updateColaborador){
      this.colaboradorService.openEditModal$.next(colaborador);
  }


  dataReload():void{
    this.observable$ = this.filter.valueChanges.pipe(
      startWith(''),
      switchMap((text) => this.colaboradorService.getColaboradores()),
      map((resp) => {
        this.listadoColaboradores = resp;
        return this.search(this.filter.value, this.pipes);
      })
    );
  }

  constructor(
    private colaboradorService: ColaboradorService,
    pipe: DecimalPipe
  ) {
    this.pipes = pipe;

    this.colaboradorService.reload$.subscribe(data =>{
      this.dataReload();
    });

    this.observable$ = this.filter.valueChanges.pipe(
      startWith(''),
      switchMap((text) => this.colaboradorService.getColaboradores()),
      map((resp) => {
        this.listadoColaboradores = resp;
        return this.search(this.filter.value, this.pipes);
      })
    );
  }
}

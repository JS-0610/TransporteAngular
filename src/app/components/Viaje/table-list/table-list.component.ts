import { Component, Input } from '@angular/core';

@Component({
  selector: 'Viaje-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
    @Input()
    public isButtonAdd:boolean = true;
}

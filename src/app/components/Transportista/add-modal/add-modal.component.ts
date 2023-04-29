import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'transportista-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent {
  constructor(private modalService: NgbModal) {}

  open(content:any):void {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,backdrop:'static',size:'m' });
	}
}

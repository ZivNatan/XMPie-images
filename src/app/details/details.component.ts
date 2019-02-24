import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent  {

  @Input() img;
  @Output() toggle = new EventEmitter();

  constructor() { }


  close() {
    this.toggle.emit({closeDetails: true});
  }

}

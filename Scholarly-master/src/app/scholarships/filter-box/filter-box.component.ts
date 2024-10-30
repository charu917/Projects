import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
})
export class FilterBoxComponent {
  data: any[] = [];
  @Output() sendData: EventEmitter<any[]> = new EventEmitter<any[]>();
  sendToParent() {
    this.sendData.emit(this.data);
  }
}

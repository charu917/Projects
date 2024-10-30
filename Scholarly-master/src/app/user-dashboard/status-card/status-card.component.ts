import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css'],
})
export class StatusCardComponent {
  @Input() text: String = '';
  @Input() count: Number = 0;
}

import { Component, Input } from '@angular/core';
import { Scholarship } from 'src/app/Scholarship.interface';
@Component({
  selector: 'app-scholarships-display',
  templateUrl: './scholarships-display.component.html',
  styleUrls: ['./scholarships-display.component.css'],
})
export class ScholarshipsDisplayComponent {
  @Input() popular: any = '';
}

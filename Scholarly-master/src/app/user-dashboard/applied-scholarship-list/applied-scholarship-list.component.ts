import { Component, Input } from '@angular/core';
import { FormatTitlePipe } from 'src/app/format-title.pipe';
FormatTitlePipe;
@Component({
  selector: 'app-applied-scholarship-list',
  templateUrl: './applied-scholarship-list.component.html',
  styleUrls: ['./applied-scholarship-list.component.css'],
})
export class AppliedScholarshipListComponent {
  @Input() user_data: any;
}

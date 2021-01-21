import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comments-filter',
  templateUrl: './comments-filter.component.html',
  styleUrls: ['./comments-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsFilterComponent {
  @Input() availableTags: string[] = [];
  @Output() filterChanged = new EventEmitter<string[]>();

  _control = new FormControl();
}

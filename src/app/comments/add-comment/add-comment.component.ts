import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment, COMMENT_TEXT_VALIDATORS, COMMENT_TITLE_VALIDATORS } from '../models';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  @Input() availableTags: string[] = [];
  @Output() add = new EventEmitter();

  _form: FormGroup;
  _showPreview = false;

  constructor(private readonly fb: FormBuilder, private readonly cd: ChangeDetectorRef) {
    this._form = this.fb.group({
      title: [null, COMMENT_TITLE_VALIDATORS],
      text: [null, COMMENT_TEXT_VALIDATORS],
      tags: [[]],
    });
  }

  clear() {
    this._form.setValue({
      title: '',
      text: '',
      tags: [],
    } as Comment);
    this._form.markAsUntouched();
  }

  addComment() {
    // this.add.emit(this._form.value);
    this.clear();
  }

  togglePreview() {
    this._showPreview = !this._showPreview;
    this.cd.markForCheck();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, COMMENT_TEXT_VALIDATORS, COMMENT_TITLE_VALIDATORS } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { deepClone } from '../../common/utils/utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() set comment(value: Comment) {
    this._form.setValue(value);
  }
  @Input() availableTags: string[] = [];
  @Input() readonly = true;

  @Output() remove = new EventEmitter<Comment>();
  @Output() edit = new EventEmitter<Comment>();

  _form: FormGroup;
  private commentSnapshot?: Comment;

  constructor(private readonly fb: FormBuilder, private cd: ChangeDetectorRef) {
    this._form = this.fb.group({
      id: [],
      title: [null, COMMENT_TITLE_VALIDATORS],
      text: [null, COMMENT_TEXT_VALIDATORS],
      tags: [[]],
    });
  }

  startEdit() {
    this.readonly = false;
    this.commentSnapshot = deepClone(this._form.value!);
  }

  finishEdit() {
    this.readonly = true;
    this.edit.emit(this._form.value!);
    this.cd.markForCheck();
  }

  cancelEdit() {
    this.readonly = true;
    this._form.setValue(this.commentSnapshot!);
    this.cd.markForCheck();
  }
}

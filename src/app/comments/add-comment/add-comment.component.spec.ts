import { AddCommentComponent } from './add-comment.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { TranslateModule } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { addNewTagItem, getControl, getNearestInputError, typeInControl } from '../../../testing/test-utils';
import { COMMENTS } from '../../../testing/mock-data';
import { EvaluateMathExpressionsModule } from '../../common/html-expression-pipe/evaluate-math-expressions.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

describe('AddCommentComponent', () => {
  const COMMENT = { ...COMMENTS[0], id: undefined };

  let spectator: Spectator<AddCommentComponent>;
  const createComponent = createComponentFactory({
    component: AddCommentComponent,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NgxErrorMessageModule,
      TagInputModule,
      TranslateModule.forRoot(),
      EvaluateMathExpressionsModule,
      HttpClientModule,
      AngularEditorModule,
    ],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be able to add new comment', () => {
    spectator.component.add.emit = jest.fn();
    spectator.detectChanges();

    typeInControl(spectator, 'title', COMMENT.title);
    spectator.component._form.get('text').setValue(COMMENT.text);
    addNewTagItem(spectator, COMMENT.tags);

    spectator.click(spectator.query('button[type="submit"]')!);

    expect(spectator.component.add.emit).toHaveBeenCalledWith(COMMENT);
  });

  it('title and text is required', () => {
    spectator.component.add.emit = jest.fn();
    spectator.detectChanges();

    const title = spectator.query(`[formControlName="title"]`);
    spectator.focus(title);
    spectator.blur(title);

    spectator.detectChanges();
    expect(getNearestInputError(spectator, 'title')).toExist();

    spectator.click(spectator.query('button[type="submit"]')!);

    expect(spectator.component.add.emit).not.toHaveBeenCalledWith(COMMENT);
  });

  it('should clear controls after adding', () => {
    typeInControl(spectator, 'title', COMMENT.title);
    spectator.component._form.get('text').setValue(COMMENT.text);
    spectator.detectChanges();

    spectator.click(spectator.query('button[type="submit"]')!);

    spectator.detectChanges();
    expect(getNearestInputError(spectator, 'title')).not.toExist();
    expect(getNearestInputError(spectator, 'text')).not.toExist();

    expect(getControl(spectator, 'title')).toHaveValue('');
    expect(getControl(spectator, 'text')).toHaveValue('');
  });
});

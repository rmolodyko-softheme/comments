import { AddCommentComponent } from './add-comment.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { TranslateModule } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { addNewTagItem, getControl, getNearestInputError, typeInControl } from '../../../testing/test-utils';
import { COMMENTS } from '../../../testing/mock-data';
import { EvaluateMathExpressionsModule } from '../../common/html-expression-pipe/evaluate-math-expressions.module';

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
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be able to add new comment', () => {
    spectator.component.add.emit = jest.fn();

    typeInControl(spectator, 'title', COMMENT.title);
    typeInControl(spectator, 'text', COMMENT.text);
    addNewTagItem(spectator, COMMENT.tags);

    spectator.click(spectator.query('button[type="submit"]'));

    expect(spectator.component.add.emit).toHaveBeenCalledWith(COMMENT);
  });

  it('title and test is required', () => {
    spectator.component.add.emit = jest.fn();

    typeInControl(spectator, 'title', '');
    typeInControl(spectator, 'text', '');

    spectator.click(spectator.query('button[type="submit"]'));

    spectator.detectChanges();
    expect(getNearestInputError(spectator, 'title')).toExist();

    expect(spectator.component.add.emit).not.toHaveBeenCalledWith(COMMENT);
  });

  it('should clear controls after adding', () => {
    typeInControl(spectator, 'title', COMMENT.title);
    typeInControl(spectator, 'text', COMMENT.text);
    spectator.click(spectator.query('button[type="submit"]'));

    spectator.detectChanges();
    expect(getNearestInputError(spectator, 'title')).not.toExist();
    expect(getNearestInputError(spectator, 'text')).not.toExist();

    expect(getControl(spectator, 'title')).toHaveValue('');
    expect(getControl(spectator, 'text')).toHaveValue('');
  });

  it('should be able to display text preview', () => {
    spectator.detectChanges();
    expect(spectator.query('.add-comment__preview')).not.toExist();

    spectator.click(spectator.query('.add-comment__show-preview'));
    typeInControl(spectator, 'text', COMMENT.text);

    spectator.detectChanges();
    expect(spectator.query('.add-comment__preview')).toHaveText(COMMENT.text);
  });

  it('should be able to display html preview after sanitizing', () => {
    // Since innerHtml automatically sanitize content we can use it to display our text
    spectator.click(spectator.query('.add-comment__show-preview'));
    typeInControl(
      spectator,
      'text',
      `simple text<strong>strong</strong><a href="http://google.com">link</a><script>alert(1);</script>`
    );

    spectator.detectChanges();
    expect(spectator.query('.add-comment__preview').innerHTML.trim()).toEqual(
      'simple text<strong>strong</strong><a href="http://google.com">link</a>'
    );
  });
});

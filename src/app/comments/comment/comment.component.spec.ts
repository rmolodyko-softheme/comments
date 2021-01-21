import { CommentComponent } from './comment.component';
import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule } from '@ngx-translate/core';
import { getControl, typeInControl } from '../../../testing/test-utils';
import { COMMENTS } from '../../../testing/mock-data';
import { EvaluateMathExpressionsModule } from '../../common/html-expression-pipe/evaluate-math-expressions.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

describe('CommentComponent', () => {
  const COMMENT = COMMENTS[0];
  let spectator: Spectator<CommentComponent>;
  const createComponent = createComponentFactory({
    component: CommentComponent,
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

  it('should be able to show field in readonly mode', () => {
    spectator.component.comment = COMMENT;
    spectator.detectChanges();

    expect(spectator.query('.comment__name')).toHaveText(COMMENT.title);
    expect(spectator.query('.comment__content')).toHaveText(COMMENT.text);
    expect(spectator.query('.comment__tags .tag__text')).toHaveText(COMMENT.tags[0]);
  });

  it('should be able to go to editable mode', () => {
    spectator.component.comment = COMMENT;
    spectator.detectChanges();

    spectator.click(spectator.query(byText('Edit'))!);
    spectator.detectChanges();

    expect(getControl(spectator, 'title')).toHaveValue(COMMENT.title);
    expect(spectator.query('.comment__tags .tag__text')).toHaveText(COMMENT.tags[0]);
  });

  it('should be able to edit comment', () => {
    spectator.component.edit.emit = jest.fn();
    spectator.component.comment = COMMENT;
    spectator.detectChanges();

    spectator.click(spectator.query(byText('Edit'))!);
    spectator.detectChanges();

    const newTitle = 'New title';
    typeInControl(spectator, 'title', newTitle);

    spectator.click(spectator.query(byText('Save'))!);
    spectator.detectChanges();

    expect(spectator.component.edit.emit).toHaveBeenCalledWith({ ...COMMENT, title: newTitle });
  });

  it('should be able to cancel editing', () => {
    spectator.component.edit.emit = jest.fn();
    spectator.component.comment = COMMENT;
    spectator.detectChanges();

    spectator.click(spectator.query(byText('Edit'))!);
    spectator.detectChanges();

    const newTitle = 'New title';
    typeInControl(spectator, 'title', newTitle);

    spectator.click(spectator.query(byText('Cancel'))!);
    spectator.detectChanges();

    expect(spectator.query('.comment__name')).toHaveText(COMMENT.title);
    expect(spectator.component.edit.emit).not.toHaveBeenCalledWith({ ...COMMENT, title: newTitle });
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { CommentsComponent } from './comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { TagInputModule } from 'ngx-chips';
import { CommentComponent } from '../comment/comment.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentsService } from '../comments.service';
import { of } from 'rxjs';
import { COMMENTS, TAGS } from '../../../testing/mock-data';
import { EvaluateMathExpressionsModule } from '../../common/html-expression-pipe/evaluate-math-expressions.module';

describe('CommentsListComponent', () => {
  let spectator: Spectator<CommentsComponent>;
  const createComponent = createComponentFactory({
    component: CommentsComponent,
    mocks: [CommentsService],
    declarations: [CommentComponent, AddCommentComponent],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NgxErrorMessageModule,
      TagInputModule,
      TranslateModule.forRoot(),
      EvaluateMathExpressionsModule,
    ],
    detectChanges: false,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be able to render comments', () => {
    const c = spectator.inject(CommentsService);
    jest.spyOn(c, 'comments$', 'get').mockReturnValue(of(COMMENTS));
    jest.spyOn(c, 'tags$', 'get').mockReturnValue(of(TAGS));

    spectator.detectChanges();

    expect(c.load).toHaveBeenCalled();
    expect(spectator.queryAll('app-comment').length).toEqual(2);
  });

  it('should be able to handle no comments', () => {
    const c = spectator.inject(CommentsService);
    jest.spyOn(c, 'comments$', 'get').mockReturnValue(of([]));
    jest.spyOn(c, 'tags$', 'get').mockReturnValue(of([]));

    spectator.detectChanges();

    expect(c.load).toHaveBeenCalled();
    expect(spectator.queryAll('.list__no-items')).toExist();
  });

  it('should be able to delete comment', () => {
    const commentsService = spectator.inject(CommentsService);
    jest.spyOn(commentsService, 'comments$', 'get').mockReturnValue(of(COMMENTS));
    jest.spyOn(commentsService, 'tags$', 'get').mockReturnValue(of(TAGS));

    spectator.detectChanges();

    spectator.click(spectator.query('app-comment .comment__controls button.danger')!);

    spectator.detectChanges();
    expect(commentsService.remove).toHaveBeenCalledWith(COMMENTS[0]);
  });
});

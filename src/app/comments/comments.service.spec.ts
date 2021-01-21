import { CommentsService, filterCommentsByTags, getCommentTags } from './comments.service';
import { SpectatorService, SpyObject } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { CommentsHttpService } from './comments-http.service';
import { of } from 'rxjs';
import { expectMarble } from '../../testing/test-utils-marble';
import { Comment } from './models';
import { COMMENTS, TAGS } from '../../testing/mock-data';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CommentsService', () => {
  let commentsHttpService: SpyObject<CommentsHttpService>;
  let snackbarService: SpyObject<MatSnackBar>;
  let spectator: SpectatorService<CommentsService>;
  const createService = createServiceFactory({
    service: CommentsService,
    mocks: [CommentsHttpService, MatSnackBar],
  });

  beforeEach(() => {
    spectator = createService();
    commentsHttpService = spectator.inject(CommentsHttpService);
    snackbarService = spectator.inject(MatSnackBar);
    commentsHttpService.list.andReturn(of(COMMENTS));
    spectator.service.load();
  });

  it('should be able to load comments', () => {
    expect(commentsHttpService.list).toHaveBeenCalled();
    expectMarble(() => spectator.service.comments$, '(a)', { a: COMMENTS });
  });

  it('should be able to add comment', () => {
    const newComment = { id: 1, title: 'New title', text: 'New text', tags: [] } as Comment;
    commentsHttpService.add.andReturn(of(newComment));
    spectator.service.add(newComment);

    expectMarble(() => spectator.service.comments$, '(a)', { a: [...COMMENTS, newComment] });
    expect(snackbarService.open).toHaveBeenCalled();
  });

  it('should be able to remove comment', () => {
    commentsHttpService.remove.andReturn(of(null));
    spectator.service.remove(COMMENTS[0]);

    expectMarble(() => spectator.service.comments$, '(a)', { a: [COMMENTS[1]] });
    expect(snackbarService.open).toHaveBeenCalled();
  });

  it('should be able to edit comment', () => {
    const editedComment = { ...COMMENTS[0], title: 'Edited title' };
    commentsHttpService.edit.andReturn(of(editedComment));
    spectator.service.edit(editedComment);

    expectMarble(() => spectator.service.comments$, '(a)', { a: [editedComment, COMMENTS[1]] });
    expect(snackbarService.open).toHaveBeenCalled();
  });

  it('should be able to edit not existing comment', () => {
    const editedComment = { ...COMMENTS[0], title: 'Edited title' };
    commentsHttpService.edit.andReturn(of({ id: 999 }));
    spectator.service.edit(editedComment);

    expectMarble(() => spectator.service.comments$, '(a)', { a: COMMENTS });
  });

  it('should be able to filter by tags', () => {
    spectator.service.filterByTags(TAGS);

    expectMarble(() => spectator.service.comments$, '(a)', { a: [COMMENTS[0]] });
  });

  it('should be able to get comments tags', () => {
    expectMarble(() => spectator.service.tags$, '(a)', { a: TAGS });
  });

  it('should get comments tags', () => {
    expect(getCommentTags(COMMENTS)).toEqual(TAGS);
  });

  it('should filter comments by tags', () => {
    expect(filterCommentsByTags([COMMENTS, TAGS])).toEqual([COMMENTS[0]]);
  });
});

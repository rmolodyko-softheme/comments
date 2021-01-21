import { SpectatorService, SpyObject } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { CommentsHttpService } from './comments-http.service';
import { of } from 'rxjs';
import { expectMarble } from '../../testing/test-utils-marble';
import { HttpClient } from '@angular/common/http';
import { COMMENTS } from '../../testing/mock-data';

describe('CommentsHttpService', () => {
  let httpClient: SpyObject<HttpClient>;
  let spectator: SpectatorService<CommentsHttpService>;
  const createService = createServiceFactory({
    service: CommentsHttpService,
    mocks: [HttpClient],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject(HttpClient);
  });

  it('should be able to get list of comments', () => {
    httpClient.get.andReturn(of(COMMENTS));
    expectMarble(() => spectator.service.list(), '(a|)', { a: COMMENTS });
  });

  it('should be able to edit comment', () => {
    const editedComment = { ...COMMENTS[0], title: 'Edited title' };
    httpClient.put.andReturn(of(editedComment));
    expectMarble(() => spectator.service.edit(editedComment), '(a|)', { a: editedComment });
  });

  it('should be able to remove comment', () => {
    httpClient.delete.andReturn(of(null));
    expectMarble(() => spectator.service.remove(COMMENTS[0].id!), '(a|)', { a: null });
  });

  it('should be able to add comment', () => {
    httpClient.post.andReturn(of(COMMENTS[0]));
    expectMarble(() => spectator.service.add(COMMENTS[0]), '(a|)', { a: COMMENTS[0] });
  });
});

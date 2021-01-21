import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from './models';

@Injectable()
export class CommentsHttpService {
  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Comment[]>('/comments');
  }

  add(comment: Comment) {
    return this.httpClient.post<Comment>('/comments', comment);
  }

  remove(commentId: number) {
    return this.httpClient.delete<void>(`/comments/${commentId}`);
  }

  edit(comment: Comment) {
    return this.httpClient.put<Comment>(`/comments/${comment.id}`, comment);
  }
}

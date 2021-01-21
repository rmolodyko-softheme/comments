import { Injectable, OnDestroy } from '@angular/core';
import { Comment } from './models';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { CommentsHttpService } from './comments-http.service';
import { map } from 'rxjs/operators';
import { deepClone, removeDuplicates } from '../common/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CommentsService implements OnDestroy {
  get comments$() {
    return combineLatest([this.commentsSubject.asObservable(), this.filterTagsSubject.asObservable()]).pipe(
      map(filterCommentsByTags)
    );
  }

  get tags$() {
    return this.commentsSubject.asObservable().pipe(map(getCommentTags));
  }

  private filterTagsSubject = new BehaviorSubject<string[]>([]);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  private subscription = new Subscription();

  constructor(private commentsHttpService: CommentsHttpService, private snackbar: MatSnackBar) {}

  load() {
    // We do not need to unsubscribe of this observable because it triggers only once, also we can convert it to promise
    // But i think it is a good practice to unsubscribe of every observable on the application
    this.subscription.add(
      this.commentsHttpService.list().subscribe((data) => {
        this.commentsSubject.next(data);
      })
    );
  }

  add(comment: Comment) {
    this.subscription.add(
      this.commentsHttpService.add(comment).subscribe((data) => {
        this.commentsSubject.next([...this.commentsSubject.value, data]);

        this.snackbar.open('Comment was added.');
      })
    );
  }

  edit(comment: Comment) {
    this.subscription.add(
      this.commentsHttpService.edit(comment).subscribe((data) => {
        const comments = this.commentsSubject.value.slice();
        const index = comments.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          comments[index] = data;
          this.commentsSubject.next(comments);

          this.snackbar.open('Comment was edited.');
        }
      })
    );
  }

  remove(comment: Comment) {
    this.subscription.add(
      this.commentsHttpService.remove(comment.id!).subscribe(() => {
        this.commentsSubject.next(this.commentsSubject.value.filter((item) => item.id !== comment.id));

        this.snackbar.open('Comment was removed.');
      })
    );
  }

  filterByTags(tags: string[]) {
    this.filterTagsSubject.next(tags);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export function getCommentTags(comments: Comment[]) {
  const tags = [];
  for (const comment of comments) {
    tags.push(...comment.tags);
  }

  return removeDuplicates(tags);
}

export function filterCommentsByTags([comments, tags]: [Comment[], string[]]) {
  if (tags.length > 0) {
    const newComments = [];
    for (const comment of comments) {
      if (comment.tags.some((tag) => tags.includes(tag))) {
        const newComment = deepClone(comment);
        newComments.push(newComment);
      }
    }

    return newComments;
  } else {
    return comments;
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comment } from '../models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  constructor(public readonly commentsService: CommentsService) {}

  ngOnInit() {
    this.commentsService.load();
  }

  commentTrackByFn(index: number, comment: Comment) {
    return comment.id;
  }
}

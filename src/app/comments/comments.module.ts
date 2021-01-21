import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsHttpService } from './comments-http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { CommentsService } from './comments.service';
import { CommentsFilterComponent } from './comments-filter/comments-filter.component';
import { EvaluateMathExpressionsModule } from '../common/html-expression-pipe/evaluate-math-expressions.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [CommentsComponent, CommentComponent, AddCommentComponent, CommentsFilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CommentsRoutingModule,
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    NgxErrorMessageModule,
    EvaluateMathExpressionsModule,
    MatSnackBarModule,
    AngularEditorModule,
  ],
  providers: [
    CommentsHttpService,
    CommentsService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500, horizontalPosition: 'end' } as MatSnackBarConfig,
    },
  ],
})
export class CommentsModule {}

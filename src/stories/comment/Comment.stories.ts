import { Meta, Story } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from '../../app/comments/comment/comment.component';
import { Comment } from '../../app/comments/models';
import { AddCommentComponent } from '../../app/comments/add-comment/add-comment.component';
import { EvaluateMathExpressionsModule } from '../../app/common/html-expression-pipe/evaluate-math-expressions.module';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { TranslateModule } from '@ngx-translate/core';

export default {
  title: 'Example/Comment',
  component: CommentComponent,
} as Meta;

const Template: Story<CommentComponent> = (args: CommentComponent) =>
  ({
    component: CommentComponent,
    props: args,
    moduleMetadata: {
      imports: [
        CommonModule,
        TagInputModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EvaluateMathExpressionsModule,
        NgxErrorMessageModule,
        TranslateModule.forRoot(),
      ],
    },
  } as StoryFnAngularReturnType);

const comment = {
  id: 1,
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  title: 'Topic',
  tags: ['Tag 1'],
} as Comment;

export const Readonly = Template.bind({});
Readonly.args = {
  comment,
  readonly: true,
};

export const Editable = Template.bind({});
Editable.args = {
  comment,
  readonly: false,
};

const AddCommentTemplate: Story<AddCommentComponent> = (args: AddCommentComponent) =>
  ({
    component: AddCommentComponent,
    props: args,
    moduleMetadata: {
      imports: [
        CommonModule,
        TagInputModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EvaluateMathExpressionsModule,
        NgxErrorMessageModule,
        TranslateModule.forRoot(),
      ],
    },
  } as StoryFnAngularReturnType);

export const AddComment = AddCommentTemplate.bind({});
AddComment.args = {};

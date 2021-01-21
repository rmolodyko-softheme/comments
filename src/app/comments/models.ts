import { Validators } from '@angular/forms';

export interface Comment {
  id?: number;
  title: string;
  text: string;
  tags: string[];
}

export const COMMENT_TITLE_VALIDATORS = [Validators.required, Validators.minLength(2), Validators.maxLength(100)];
export const COMMENT_TEXT_VALIDATORS = [Validators.required, Validators.minLength(2), Validators.maxLength(1000)];

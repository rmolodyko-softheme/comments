import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluateMathExpressionsPipe } from './evaluate-math-expressions.pipe';

@NgModule({
  declarations: [EvaluateMathExpressionsPipe],
  imports: [CommonModule],
  exports: [
    EvaluateMathExpressionsPipe
  ]
})
export class EvaluateMathExpressionsModule {}

import { Pipe, PipeTransform } from '@angular/core';
import { evaluateMathExpressions } from './evaluate-math-expressions';

@Pipe({
  name: 'evaluateMathExpressions',
})
export class EvaluateMathExpressionsPipe implements PipeTransform {
  transform(value: string): string {
    return evaluateMathExpressions(value);
  }
}

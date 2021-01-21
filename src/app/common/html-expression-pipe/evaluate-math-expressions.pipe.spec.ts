import { EvaluateMathExpressionsPipe } from './evaluate-math-expressions.pipe';

describe('EvaluateMathExpressionsPipe', () => {
  it('test transform', () => {
    const pipe = new EvaluateMathExpressionsPipe();
    expect(pipe.transform('4+5')).toEqual('4+5(=9)');
  });
});

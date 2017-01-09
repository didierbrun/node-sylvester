import { expect } from 'chai';
import { Vector } from '../src';
import { asDiagram } from './_as-diagram';

describe('vector', () => {
  const x = new Vector([3, 4]);

  asDiagram('Vector.magnitude').it(expectCall => {
    expectCall(x).magnitude().to.equal(5);
  });

  asDiagram('Vector.e').it(expectCall => {
    expectCall(x).e(0).to.be.null;
    expectCall(x).e(1).to.equal(3);
    expectCall(x).e(3).to.be.null;
  });

  asDiagram('Vector.toUnitVector').it(expectCall => {
    expectCall(x).toUnitVector().to.vector.equal([0.6, 0.8]);
    expectCall(new Vector([0, 0])).toUnitVector().to.vector.equal([0, 0]);
  });

  asDiagram('Vector.dimensions').it(expectCall => {
    expectCall(x).dimensions().to.deep.equal({ rows: 1, cols: 2 });
  });

  asDiagram('Vector.rows').it(expectCall => {
    expectCall(x).rows().to.equal(1);
  });

  asDiagram('Vector.cols').it(expectCall => {
    expectCall(x).cols().to.equal(2);
  });

  asDiagram('Vector.eql').it(expectCall => {
    expectCall(x).eql([3, 4]).to.be.true;
    expectCall(x).eql([5, 6]).to.be.false;
  });
  asDiagram('Vector.angleFrom').it(expectCall => {
    expectCall(new Vector([1, 1]))
      .angleFrom(new Vector([1, 0]))
      .to.approx.equal(Math.PI / 4);
  });

  it('Vector.map', () => {
    expect(x.map(y => y * 2)).to.vector.equal([6, 8]);
    expect(x.map((y, i) => i)).to.vector.equal([1, 2]);
  });

  it('Vector.each', () => {
    let sum = 0;
    x.each(y => {
      sum += y;
    });
    expect(sum).to.equal(7);
  });

  it('should log', () => {
    expect(x.log()).to.vector.equal([1.0986122886681098, 1.386294361119890]);
  });

  it('should dot product', () => {
    expect(x.dot(new Vector([2, 3]))).to.equal(18);
  });

  it('should support removal of head positions', () => {
    expect(x.chomp(1)).to.vector.equal([4]);
  });

  it('should sum', () => {
    expect(x.sum()).to.equal(7);
  });

  it('should support addition of elements on the right side', () => {
    // expect(x.augment([4, 5])).to.vector.equal([1, 2, 3, 4, 5]);
  });

  it('show allow for scalar addition', () => {
    const a = new Vector([2, 3, 4]);
    const b = a.add(1);
    expect(b).to.vector.equal([3, 4, 5]);
  });

  it('show add', () => {
    const a = new Vector([2, 3, 4]);
    const b = a.add(new Vector([2, 4, 8]));
    expect(b).to.vector.equal([undefined, 7, 12]);
  });
});

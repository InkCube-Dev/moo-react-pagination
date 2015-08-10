
import {expect} from 'chai';
import Utility from '../src/utility';

describe('Utility', () => {
  describe('calculate total pages', () => {
    let testSets = [
      {count: 100, perPage: 10, totalPages: 10},
      {count: 101, perPage: 10, totalPages: 11},
      {count: 100, perPage: 100, totalPages: 1},
    ];
    it('should return total pages', () => {
      testSets.forEach((test) => {
        expect(Utility.calcTotalPages(test.count, test.perPage))
          .to.equal(test.totalPages);
      });
    });
  });

  describe('calculate start & end cells', () => {
    let testSets = [
      {
        numberCells: 8,
        page: 1,
        totalPages: 100,
        cells: { startCell: 1, endCell: 8}
      },
      {
        numberCells: 8,
        page: 2,
        totalPages: 100,
        cells: { startCell: 1, endCell: 8}
      },
      {
        numberCells: 8,
        page: 3,
        totalPages: 100,
        cells: { startCell: 1, endCell: 8}
      },
      {
        numberCells: 8,
        page: 4,
        totalPages: 100,
        cells: { startCell: 1, endCell: 8}
      },
      {
        numberCells: 8,
        page: 5,
        totalPages: 100,
        cells: { startCell: 1, endCell: 8}
      },
      {
        numberCells: 8,
        page: 6,
        totalPages: 100,
        cells: { startCell: 2, endCell: 9}
      },
      {
        numberCells: 8,
        page: 96,
        totalPages: 100,
        cells: { startCell: 92, endCell: 99}
      },
      {
        numberCells: 8,
        page: 97,
        totalPages: 100,
        cells: { startCell: 93, endCell: 100}
      },
      {
        numberCells: 8,
        page: 98,
        totalPages: 100,
        cells: { startCell: 93, endCell: 100}
      },
      {
        numberCells: 8,
        page: 99,
        totalPages: 100,
        cells: { startCell: 93, endCell: 100}
      },
      {
        numberCells: 8,
        page: 100,
        totalPages: 100,
        cells: { startCell: 93, endCell: 100}
      },
    ];
    it('should return cells array', () => {
      testSets.forEach((test) => {
        expect(Utility.calcStartEndCells(test.numberCells, test.page, test.totalPages))
          .to.deep.equal(test.cells);
      });
    });
  });

  describe('generate number range', () => {
    let testSets = [
      {start: 0, end: 5, list: [0, 1, 2, 3, 4, 5]},
      {start: 95, end: 100, list: [95, 96, 97, 98, 99, 100]},
      {start: -5, end: 0, list: [-5, -4, -3, -2, -1, 0]},
    ];
    it('should generate number list', () => {
      testSets.forEach((test) => {
        expect(Utility.generateRange(test.start, test.end))
          .to.deep.equal(test.list);
      });
    });
  });
});

const map = require('lodash/map');
const intersection = require('lodash/intersection');
const flatten = require('lodash/flatten');

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// может решать только простые

// easy
const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

/*
// easy
const puzzle = [
  [1, 0, 0, 0, 0, 7, 0, 5, 9],
  [0, 0, 0, 4, 0, 0, 1, 0, 0],
  [9, 0, 8, 0, 0, 0, 4, 6, 3],
  [0, 0, 5, 0, 0, 9, 0, 3, 0],
  [0, 1, 9, 5, 0, 3, 7, 8, 0],
  [0, 3, 0, 1, 0, 0, 9, 0, 0],
  [3, 5, 7, 0, 0, 0, 6, 0, 8],
  [0, 0, 2, 0, 0, 5, 0, 0, 0],
  [8, 9, 0, 7, 0, 0, 0, 0, 4]
];*/

// не решит
// medium
/*
const puzzle = [
  [1, 0, 0, 0, 5, 0, 6, 0, 0],
  [6, 0, 0, 0, 8, 0, 0, 1, 0],
  [0, 0, 9, 0, 0, 6, 2, 0, 0],
  [0, 1, 0, 0, 0, 0, 9, 0, 7],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [2, 0, 4, 0, 0, 0, 0, 3, 0],
  [0, 0, 9, 7, 0, 0, 0, 8, 0],
  [0, 2, 0, 0, 4, 0, 0, 0, 6],
  [0, 0, 8, 0, 3, 0, 0, 0, 9]
];*/

const SECTION_LIST = [
  //min: [x, y]  max: [x, y]
  { min: [0, 0], max: [2, 2] },
  { min: [3, 0], max: [5, 2] },
  { min: [6, 0], max: [8, 2] },

  { min: [0, 3], max: [2, 5] },
  { min: [3, 3], max: [5, 5] },
  { min: [6, 3], max: [8, 5] },

  { min: [0, 6], max: [2, 8] },
  { min: [3, 6], max: [5, 8] },
  { min: [6, 6], max: [8, 8] },
];

function toString(puzzle) {
  let str = '-'.repeat(puzzle.length * 3) + '\n';

  for (let i = 0; i < puzzle.length; i++) {
    const row = puzzle[i];

    str += row.reduce((acc, val, index) => {
      acc.push(val === 0 ? ' ' : val);

      if ((index + 1) % 3 === 0) {
        acc.push(' | ');
      }

      return acc;
    }, []).join(' ') + '\n';

    if ((i + 1) % 3 === 0) {
      str += '-'.repeat(puzzle.length * 3) + '\n';
    }
  }

  return str;
};

function getPossibleColumn(puzzle, y) {
  const columnValues = map(puzzle, y);

  return range
    .filter(n => !columnValues.includes(n));
}

function getPossibleRow(puzzle, x) {
  const rowValues = puzzle[x];

  return range
    .filter(n => !rowValues.includes(n));
}

function getSquare(x, y) {
  for (let section of SECTION_LIST) {
    if (y >= section.min[0] && y <= section.max[0] && x >= section.min[1] && x <= section.max[1]) {
      return section;
    }
  }
}

function getPossibleSection(puzzle, section) {
  const numbers = [];

  for (let x = section.min[0]; x <= section.max[0]; x++) {
    for (let y = section.min[1]; y <= section.max[1]; y++) {
      numbers.push(puzzle[x][y]);
    }
  }

  return range.filter(n => !numbers.includes(n));
}

function isValid(puzzle) {
  return flatten(puzzle).filter(n => n === 0).length === 0;
}

function main(puzzle) {
  const length = puzzle.length;
  const result = [...puzzle];

  for (let i = 1; i < 10; i += 1) {

    for (let x = 0; x < length; x += 1) {
      dance:
      for (let y = 0; y < length; y += 1) {
        if (result[y][x] !== 0) {
          continue dance;
        }

        const section = getSquare(x, y);

        const rowValues = getPossibleRow(result, y);
        const colValues = getPossibleColumn(result, x);
        const secValues = getPossibleSection(result, section);

        const possibleValues = intersection(rowValues, colValues, secValues);

        if (possibleValues.length === 1 && i === possibleValues[0]) {
          result[y][x] = i;
        }

        counter += 1;
      }
    }
  }

  return puzzle;
}

let result = [...puzzle];
let counter = 0;
let iter = 0;

while (!isValid(result)) {
  result = main(result);
  iter += 1;

  if (iter >= 10) {
    console.log('limit exceeded');
    break;
  }
}

console.log(toString(result));
console.log('counter = %d, iter = %d', counter, iter);

/*
>>

5 3 4  |  6 7 8  |  9 1 2  |
6 7 2  |  1 9 5  |  3 4 8  |
1 9 8  |  3 4 2  |  5 6 7  |
---------------------------
8 5 9  |  7 6 1  |  4 2 3  |
4 2 6  |  8 5 3  |  7 9 1  |
7 1 3  |  9 2 4  |  8 5 6  |
---------------------------
9 6 1  |  5 3 7  |  2 8 4  |
2 8 7  |  4 1 9  |  6 3 5  |
3 4 5  |  2 8 6  |  1 7 9  |
---------------------------

counter = 1283, iter = 6
*/

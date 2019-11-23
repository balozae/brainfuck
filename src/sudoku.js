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

// easy
/*
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
];
*/

// medium - не решит
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
];
*/

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getSquare(puzzle, rowIndex, columnIndex) {
  const res = [];

  // получение начальных значений квадрата
  const startRowIndex = rowIndex - (rowIndex % 3);
  const startColumnIndex = columnIndex - (columnIndex % 3);

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      res.push(puzzle[startRowIndex + i][startColumnIndex + j]);
    }
  }

  return res;
}

function getRow(puzzle, rowIndex) {
  return puzzle[rowIndex];
}

function getColumn(puzzle, columnIndex) {
  return puzzle.map(row => row[columnIndex]);
}

function uniq(...args) {
  const res = [];

  for (let values of args) {
    for (let value of values) {
      if (!res.includes(value) && value !== 0) {
        res.push(value);
      }
    }
  }

  return res;
}

function getPossible(impossible) {
  return range.filter(v => !impossible.includes(v));
}

function isValid(puzzle) {
  for (let row of puzzle) {
    if (row.includes(0)) {
      return false;
    }
  }

  return true;
}

function getNext(rowNum = 0, colNum = 0) {
  if (colNum !== 8) {
    return [rowNum, colNum + 1];
  }

  if (rowNum !== 8) {
    return [rowNum + 1, 0];
  }

  return [0, 0];
}

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
}

function main(puzzle, rowNum = 0, colNum = 0) {
  if (puzzle[rowNum][colNum] !== 0) {
    const [nextRowNum, nextColumnNum] = getNext(rowNum, colNum);
    return main(puzzle, nextRowNum, nextColumnNum);
  }

  const square = getSquare(puzzle, rowNum, colNum);
  const row = getRow(puzzle, rowNum);
  const column = getColumn(puzzle, colNum);
  const pos = getPossible(uniq(square, row, column));

  if (pos.length === 1) {
    puzzle[rowNum][colNum] = +pos;
  }

  let nextRowNum = rowNum, nextColNum = colNum;

  while (!isValid(puzzle)) {
    [nextRowNum, nextColNum] = getNext(nextRowNum, nextColNum);
    main(puzzle, nextRowNum, nextColNum);
  }
}

main(puzzle);

console.log(toString(puzzle));

/*
>>
---------------------------
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
*/

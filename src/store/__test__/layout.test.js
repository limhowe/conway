import test from 'ava';
import GridLayout from '../layout';

test('should return correct length', t => {
  t.plan(1);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol);
  t.is(layout.totalLength, numRow * numCol);
});

test('should return correct grid index', t => {
  t.plan(2);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol);
  const { row, col } = layout.getGridIndex(numRow + 1);

  t.is(row, 1);
  t.is(col, 1);
});

test('should return correct neighbours', t => {
  t.plan(5);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol);

  t.is(layout.getNeighbours(layout.getListIndex(1, 1)).length, 8);

  t.is(layout.getNeighbours(layout.getListIndex(0, 1)).length, 5);

  t.is(layout.getNeighbours(layout.getListIndex(0, 0)).length, 3);

  t.is(layout.getNeighbours(layout.getListIndex(1, 0)).length, 5);

  t.is(layout.getNeighbours(layout.getListIndex(2, 2)).length, 3);
});

test('should layout grid correctly', t => {
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol),
    items = [1, 3, 4, 6, 2, 4];

  const cells = layout.layoutItems(items);

  t.is(cells.length, numRow);
  t.is(cells[0].length, numCol);
});

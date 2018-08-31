import GridLayout from '../layout';
import test from 'ava';

test('should return correct length', t => {
  t.plan(1);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol);
  t.is(layout.totalLength, numRow * numCol);
});

test('should return correct neighbours', t => {
  t.plan(5);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol);

  let index = layout.getListIndex(1,1);
  t.is(layout.getNeighbours(index).length, 8);

  index = layout.getListIndex(0,1);
  t.is(layout.getNeighbours(index).length, 5);

  index = layout.getListIndex(0,0);
  t.is(layout.getNeighbours(index).length, 3);

  index = layout.getListIndex(1,0);
  t.is(layout.getNeighbours(index).length, 5);

  index = layout.getListIndex(2,2);
  t.is(layout.getNeighbours(index).length, 3);
});

test('should layout grid correctly', t => {
  t.plan(2);
  const numRow = 3,
    numCol = 3;
  const layout = new GridLayout(numRow, numCol),
    items = [1, 3, 4, 6, 2, 4];

  const cells = layout.layoutItems(items);

  t.is(cells.length, numRow);
  t.is(cells[0].length, numCol);
});


import test from 'ava';
import Game, { GameState } from '../game';
import GridLayout from '../layout';

test('game should progress', t => {
  t.plan(3);
  const game = new Game.createGame(3, 3);
  const { gameState: initialState, cells: oldCells } = game;
  game.goToNextStep();
  const { gameState: nextState, cells: newCells } = game;

  t.is(initialState, GameState.LOAD);
  t.not(nextState, initialState);
  if (nextState === GameState.PROGRESS) {
    t.notDeepEqual(oldCells, newCells);
  } else {
    t.deepEqual(oldCells, newCells);
  }
});

test.serial('game should implement rule No1 ', t => {
  const layout = new GridLayout(3, 3);
  const game = new Game(layout);
  if (
    !game.setCells([false, true, false, false, true, false, false, true, false])
  ) {
    return t.fail();
  }

  const itemsUnderRule = [[0, 1], [2, 1]];

  t.plan(itemsUnderRule.length);
  game.goToNextStep();
  const { cells } = game;

  for (let i = 0; i < itemsUnderRule.length; i++) {
    const [row, col] = itemsUnderRule[i];
    const cell = cells[row][col];
    t.is(cell, false);
  }
});

test('game should implement rule No2 ', t => {
  const layout = new GridLayout(3, 3);
  const game = new Game(layout);
  if (
    !game.setCells([false, true, false, false, true, false, false, true, false])
  ) {
    return t.fail();
  }
  const itemsUnderRule = [[1, 1]];

  t.plan(itemsUnderRule.length);
  game.goToNextStep();
  const { cells } = game;

  for (let i = 0; i < itemsUnderRule.length; i++) {
		const [row, col] = itemsUnderRule[i];
		const cell = cells[row][col];
    t.is(cell, true);
  }
});

test('game should implement rule No3 ', t => {
  const layout = new GridLayout(3, 3);
  const game = new Game(layout);
  if (
    !game.setCells([true, true, true, false, true, false, false, true, false])
  ) {
    return t.fail();
  }
  const itemsUnderRule = [[1, 1]];

  t.plan(itemsUnderRule.length);
  game.goToNextStep();
  const { cells } = game;

  for (let i = 0; i < itemsUnderRule.length; i++) {
		const [row, col] = itemsUnderRule[i];
		const cell = cells[row][col];
    t.is(cell, false);
  }
});

test('game should implement rule No4 ', t => {
  const layout = new GridLayout(3, 3);
  const game = new Game(layout);
  if (
    !game.setCells([false, true, true, false, false, false, false, true, false])
  ) {
    return t.fail();
  }
  const itemsUnderRule = [[1, 1]];

  t.plan(itemsUnderRule.length);
  game.goToNextStep();
  const { cells } = game;

  for (let i = 0; i < itemsUnderRule.length; i++) {
		const [row, col] = itemsUnderRule[i];
		const cell = cells[row][col];
    t.is(cell, true);
  }
});


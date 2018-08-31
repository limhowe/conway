import Game, { GameState } from '../game';
import test from 'ava';

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

test('game should implement rules correctly', t => {
	t.plan(4);
	const game = new Game.createGame(3, 3);
	
	game.goToNextStep();
	const { cells: newCells } = game;

	t.notDeepEqual(oldCells, newCells);
});
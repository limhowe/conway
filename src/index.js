import Game, { GameState } from './store/game';
import GridGameComponent from './components/grid';

const game = Game.createGame(20, 10);
const gridGameComponent = new GridGameComponent(game);

const autorun = setInterval(() => {
  gridGameComponent.draw();
  if (game.gameState === GameState.DONE) {
    clearInterval(autorun);
  } else {
    game.goToNextStep();
  }
}, 100);

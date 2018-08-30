import Game from './store/game';
import GridGameComponent from './components/grid';

const game = Game.createGame(40, 40, 80);
const gridGameComponent = new GridGameComponent(game);

gridGameComponent.draw();

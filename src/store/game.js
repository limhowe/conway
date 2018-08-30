import GridLayout from './layout';

export const GameState = {
  NONE: -1,
  LOAD: 0,
  PROGRESS: 1,
  DONE: 2,
};

export default class Game {
  /**
   * Game constructor
   * layout can be any layout. here we use grid layout
   * @param {GridLayout} layout
   */
  constructor(layout) {
    this._layout = layout;
    this._cells = new Array(layout.totalLength).fill(false);
    this._gameState = GameState.NONE;
  }

  /**
   * create game based on width, height and initial alive cell counts
   * @param {number} width
   * @param {number} height
   * @param {number} initialCount
   */
  static createGame(width, height, initialCount) {
    const layout = new GridLayout(width, height);
    const game = new Game(layout);
    if (!initialCount) initialCount = Math.floor((width * height) / 2);
    game.loadGame(initialCount);
    return game;
  }

  /**
   * return current game state
   */
  get gameState() {
    return this._layout.layoutItems(this._cells);
  }

  /**
   * return current game states
   */
  get cells() {
    return this._layout.layoutItems(this._cells);
  }

  /**
   * set random game with initial alive cell count
   */
  loadGame(initialCount) {
    const length = this._cells.length;
    const aliveCount = Math.min(initialCount, length);

    for (let i = 0; i < aliveCount; i++) {
      const index = Math.floor(length * Math.random());
      if (this._cells[index]) {
        i--;
      } else {
        this._cells[index] = true;
      }
    }

    this._gameState = GameState.LOAD;
  }

  /**
   * go to next game step
   */
  goToNextStep() {
    const diffCount = 0;
    this._cells = this._cells.forEach((cell, index) => {
      let neighbours = this._layout.getNeighbours(index);

      let aliveNeighbours = neighbours.filter(listIndex => this._cells[item]);

      if (cell) {
        if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
          diffCount++;
          this._cells[index] = false;
        }
      } else {
        if (aliveNeighbours.length === 3) {
          diffCount++;
          this._cells[index] = true;
        }
      }
    });

    if (diffCount > 0) {
      this._gameState = GameState.PROGRESS;
    } else {
      this._gameState = GameState.DONE;
    }
  }
}

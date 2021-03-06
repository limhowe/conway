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
    return this._gameState;
  }

  /**
   * return current game states
   */
  get cells() {
    return this._layout.layoutItems(this._cells);
  }

  /**
   * Set cell Items
   * @param {array} items 
   */
  setCells(items)  {
    // TODO: need to think about this...if this is right place
    if (items.length === this._layout.totalLength) {
      this._cells = [...items];
      return true;
    }
    return false;
  }

  /**
   * set random game with initial alive cell count
   */
  loadGame(initialCount) {
    const length = this._cells.length;
    const aliveCount = Math.min(initialCount, length);

    let indexList = Array.from({ length }, (v, k) => k);

    for (let i = 0; i < aliveCount; i++) {
      const rand = Math.floor(length * Math.random());
      const index = indexList.splice(rand, 1)[0];
      this._cells[index] = true;
    }

    this._gameState = GameState.LOAD;
  }

  /**
   * go to next game step
   */
  goToNextStep() {
    let diffCount = 0;
    this._cells = this._cells.map((cell, index) => {
      let neighbours = this._layout.getNeighbours(index);

      let aliveNeighbours = neighbours.filter(listIndex => this._cells[listIndex]);

      if (cell) {
        // RULE NO. 1 AND NO. 3
        if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
          diffCount++;
          return false;
        }
      } else {
        // RULE NO. 4
        if (aliveNeighbours.length === 3) {
          diffCount++;
          return true;
        }
      }

      // REST GOES TO RULE NO. 2
      return cell;
    });

    if (diffCount > 0) {
      this._gameState = GameState.PROGRESS;
    } else {
      this._gameState = GameState.DONE;
    }
  }
}

const DefaultDrawOptions = {
  alive: '#',
  dead: '-',
  newLine: '\n',
};

export default class GridGameComponent {
  constructor(game, drawOptions) {
    this._game = game;
    this._drawOptions = { ...DefaultDrawOptions, ...drawOptions };
  }

  draw() {
    const { alive, dead } = this._drawOptions;
    const { cells } = this._game;
    return cells
      .map(row => row.map(cell => (cell ? alive : dead)).join(''))
      .join(newLine);
  }
}

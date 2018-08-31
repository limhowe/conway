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
    const { alive, dead, newLine } = this._drawOptions;
    const { cells } = this._game;
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');

    process.stdout.write(
      cells
        .map(row => row.map(cell => (cell ? alive : dead)).join(''))
        .join(newLine)
    );
  }
}

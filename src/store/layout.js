export default class GridLayout {
  constructor(width, height) {
    this._numRows = height;
    this._numCols = width;
  }

  /**
   * total number of items in grid layout
   */
  get totalLength() {
    return this._numRows * this._numCols;
  }

  /**
   * return grid layout of list array
   * @param {array} list
   */
  layoutItems(list) {
    let items = [];
    for (let row = 0; row < this._numRows; row++) {
      let rowItems = [];
      for (let col = 0; col < this._numCols; col++) {
        const listItem = list[this.getListIndex(row, col)];
        rowItems.push(listItem);
      }
      items.push(listItem);
    }
    return items;
  }

  /**
   * convert list index into grid layout index
   * @param {number} index
   */
  getGridIndex(index) {
    const row = Math.floor(index / this._numRows);
    const col = Math.floor(index % this._numRows);

    return { row, col };
  }

  /**
   * convert grid layout index into list index
   * @param {number} row
   * @param {number} col
   */
  getListIndex(row, col) {
    if (row < 0 || row >= this._numRows || col < 0 || col >= this._numCols) {
      return -1;
    }
    return row * this._numRows + col;
  }

  /**
   * return indexes of items who are neighbour of given index item
   * @param {number} index
   */
  getNeighbours(index) {
    const { row, col } = this.getGridIndex(index);

    let items = [],
      neighbour = -1;
    if ((neighbour = this.getListIndex(row - 1, col - 1)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row - 1, col)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row - 1, col + 1)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row, col - 1)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row, col + 1)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row + 1, col - 1)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row + 1, col)) !== -1)
      items.push(neighbour);
    if ((neighbour = this.getListIndex(row + 1, col + 1)) !== -1)
      items.push(neighbour);
    return items;
  }
}

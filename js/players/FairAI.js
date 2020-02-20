class FairAI extends PlayerAI {
  constructor(name, color, src = '', x = 0, y = 0) {
    super(name, color, src, x, y);
  }

  evaluateCoordinate(y, x, tieBreaker = true) {
    if (
      y < 0 ||
      x < 0 ||
      game.world.length - 1 < y ||
      game.world.length - 1 < x ||
      !game.world[y][x].passable
    ) {
      return -1;
    }

    const r = tieBreaker ? Math.random() : 0;
    const square = game.world[y][x];
    if (this.checkIfBlank(square) && r > 0.925) return 8;
    if (this.checkIfBlank(square)) return 2;
    if (this.checkIfOwnColor(square)) return 1;
    if (this.checkIfLeadingPlayersColor(square)) return 5;
    if (this.checkIfOpponentsColor(square)) return 3;
    else return 1;
  }
}

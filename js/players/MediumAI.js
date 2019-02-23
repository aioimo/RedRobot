class MediumAI extends PlayerAI {
  constructor(name, color, src = "", x = 0, y = 0) {
    super(name, color, src, x, y);
  }

  evaluateCoordinate(y, x) {
    if (
      y < 0 ||
      x < 0 ||
      game.world.length - 1 < y ||
      game.world.length - 1 < x ||
      !game.world[y][x].passable
    ) {
      return -1;
    }
    if (this.checkIfBlank(game.world[y][x])) return 2;
    if (this.checkIfOwnColor(game.world[y][x])) return 1;
    if (this.checkIfLeadingPlayersColor(game.world[y][x])) return 2;
    if (this.checkIfOpponentsColor(game.world[y][x])) return 2;
    else return 1;
  }
}

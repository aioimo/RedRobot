class PerceptiveAI extends PlayerAI {
  constructor(name, color, src = '', x = 0, y = 0) {
    super(name, color, src, x, y);
  }

  lookAround() {
    const reducingFactor = 0.8;

    this.nextPossibleMoves.north =
      this.evaluateCoordinate(this.y - 1, this.x) > 0
        ? this.evaluateCoordinate(this.y - 1, this.x) +
          reducingFactor * this.evaluateCoordinate(this.y - 2, this.x)
        : this.evaluateCoordinate(this.y - 1, this.x);
    this.nextPossibleMoves.east =
      this.evaluateCoordinate(this.y, this.x + 1) > 0
        ? this.evaluateCoordinate(this.y, this.x + 1) +
          reducingFactor * this.evaluateCoordinate(this.y, this.x + 2)
        : this.evaluateCoordinate(this.y, this.x + 1);
    this.nextPossibleMoves.south =
      this.evaluateCoordinate(this.y + 1, this.x) > 0
        ? this.evaluateCoordinate(this.y + 1, this.x) +
          reducingFactor * this.evaluateCoordinate(this.y + 2, this.x)
        : this.evaluateCoordinate(this.y + 1, this.x);
    this.nextPossibleMoves.west =
      this.evaluateCoordinate(this.y, this.x - 1) > 0
        ? this.evaluateCoordinate(this.y, this.x - 1) +
          reducingFactor * this.evaluateCoordinate(this.y, this.x - 2)
        : this.evaluateCoordinate(this.y, this.x - 1);
  }
}

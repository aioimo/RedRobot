class PerceptiveAI extends FairAI {
  reducingFactor = 0.5;

  constructor(name, color, src = '', x = 0, y = 0) {
    super(name, color, src, x, y);
  }

  smartlyEvaluateNorth() {
    const north = [this.y - 1, this.x];
    const northEast = [this.y - 1, this.x + 1];
    const northWest = [this.y - 1, this.x - 1];
    const northNorth = [this.y - 2, this.x];

    if (this.evaluateCoordinate(...north) < 0) {
      return this.evaluateCoordinate(...north);
    }

    const sum =
      this.evaluateCoordinate(...north) +
      this.reducingFactor *
        (this.evaluateCoordinate(...northNorth, false) +
          this.evaluateCoordinate(...northEast, false) +
          this.evaluateCoordinate(...northWest, false));

    return sum;
  }

  smartlyEvaluateEast() {
    const east = [this.y, this.x + 1];
    const northEast = [this.y - 1, this.x + 1];
    const southEast = [this.y + 1, this.x + 1];
    const eastEast = [this.y, this.x + 2];

    if (this.evaluateCoordinate(...east) < 0) {
      return this.evaluateCoordinate(...east);
    }

    return (
      this.evaluateCoordinate(...east) +
      this.reducingFactor *
        (this.evaluateCoordinate(...northEast, false) +
          this.evaluateCoordinate(...southEast, false) +
          this.evaluateCoordinate(...eastEast, false))
    );
  }

  smartlyEvaluateWest() {
    const west = [this.y, this.x - 1];
    const northWest = [this.y - 1, this.x - 1];
    const southWest = [this.y + 1, this.x - 1];
    const westWest = [this.y, this.x - 2];

    if (this.evaluateCoordinate(...west) < 0) {
      return this.evaluateCoordinate(...west);
    }

    return (
      this.evaluateCoordinate(...west) +
      this.reducingFactor *
        (this.evaluateCoordinate(...northWest, false) +
          this.evaluateCoordinate(...southWest, false) +
          this.evaluateCoordinate(...westWest, false))
    );
  }

  smartlyEvaluateSouth() {
    const south = [this.y + 1, this.x];
    const southEast = [this.y + 1, this.x + 1];
    const southWest = [this.y + 1, this.x - 1];
    const southSouth = [this.y + 2, this.x];

    if (this.evaluateCoordinate(...south) < 0) {
      return this.evaluateCoordinate(...south);
    }

    const sum =
      this.evaluateCoordinate(...south) +
      this.reducingFactor *
        (this.evaluateCoordinate(...southSouth, false) +
          this.evaluateCoordinate(...southEast, false) +
          this.evaluateCoordinate(...southWest, false));

    return sum;
  }

  lookAround() {
    this.nextPossibleMoves.north = this.smartlyEvaluateNorth();
    this.nextPossibleMoves.east = this.smartlyEvaluateEast();
    this.nextPossibleMoves.south = this.smartlyEvaluateSouth();
    this.nextPossibleMoves.west = this.smartlyEvaluateWest();
  }
}

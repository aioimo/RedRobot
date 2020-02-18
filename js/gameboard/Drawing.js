class Drawing {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawScoreBoard() {
    this.ctx.save();
    const LEADERBOARD_HEIGHT = 40;
    const SPACE_FROM_TITLE = 10;
    const SPACE_BETWEEN_LINES = 12;
    const SCORE_HEIGHT = 30;

    this.ctx.translate(xDisplacement, yDisplacement);
    this.drawLeaderboardTitle(0, 0, LEADERBOARD_HEIGHT / 2);
    this.allPlayers.forEach((player, i) => {
      this.drawScorePanel({
        x: 0,
        y:
          LEADERBOARD_HEIGHT +
          SPACE_FROM_TITLE +
          i * (SPACE_BETWEEN_LINES + SCORE_HEIGHT),
        player,
        radius: SCORE_HEIGHT / 2
      });
    });
    this.ctx.restore();
  }
}

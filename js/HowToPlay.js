class Instructions {
  constructor(ctx) {
    this.ctx = ctx;
    this.textInstructions = [
      "You control the Red Robot with the arrow keys.",
      "Leave behind your red mark to get points.",
      "The other (computer) players also want points. They will also move around the board.",
      "**You can cover up their marks, and they can cover up yours.**",
      "If no one touches a square for too long, it will get a thick black border.",
      "Players cannot pass through the thick black borders.",
      "The round ends when the board is filled with color -OR- when no one can access any further white spaces.",
      "Whoever has the most points at the end of the game wins!"
    ]
  }

  blackScreen(){
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,width,height);
    this.ctx.restore();
  }

  displayText() {
    this.ctx.save();
    this.ctx.translate(2*xDisplacement,2*yDisplacement);
    this.ctx.fillStyle = "white";
    this.ctx.font = '24px serif'
    for (var i = 0; i<this.textInstructions.length;i++) {
      this.ctx.fillText(this.textInstructions[i], 0, i*60 + 30)
    }
    this.ctx.restore();
  }
}
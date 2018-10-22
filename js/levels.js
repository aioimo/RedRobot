
var levels = 
[
  {
    level: 1,
    map: matrix(8),
    humanPlayer: [new Player()],
    computerOpponents: [
      new AIPlayer('blue bear',"#009ACD","../images/blueBear.jpg", 0,4),
      new AIPlayer("pink peacock", "pink", "../images/pinkPeacock.jpg", 4,0),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 4,4)
    ]
  },
  {
    level: 2,
    map: matrix(6),
    humanPlayer: [new Player()],
    computerOpponents: [
      new AIPlayer('blue bear',"#009ACD","../images/blueBear.jpg", 0,4),
      new AIPlayer("pink peacock", "pink", "../images/pinkPeacock.jpg", 4,0),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 4,4)
    ]
  }
]

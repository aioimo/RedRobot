
var levels = 
[
  {
    level: 1,
    map: matrix(5),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('blue bear',"#009ACD","../images/blueBear.jpg", 0,4),
      new EasyAI("pink peacock", "pink", "../images/pinkPeacock.jpg", 4,4),
      new EasyAI('green gorilla',"green", "../images/greenGorilla.png", 4,0)
    ],
    maximumDuration: 20,
    starterText: "Round 1!! This is an easy training round. The other characters aren't very bright...yet. \n Move around with ARROW KEYS and score points by having your color on the board. You can cover up another player's color, but watch out, they can cover up yours too. The round ends as soon as there's no white space on the board."
  },
  {
    level: 2,
    map: matrix(6),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('blue bear',"#009ACD","../images/blueBear.jpg", 0,3),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 3,3),
      new EasyAI("pink peacock", "pink", "../images/pinkPeacock.jpg", 5,5),
    ],
    maximumDuration: 20,
    starterText: "Round 2!! The other plays are a little smarter now."
  },
  {
    level: 3,     //2 v. 1
    map: matrix(8),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('green gorilla',"green", "../images/greenGorilla.png", 3,3),
      new EasyAI('blue bear',"green","../images/blueBear.jpg", 0,3),
    ],
    maximumDuration: 15,
    starterText: "Round 3!! Wait a minute, not fair...it's 2 against 1!"
  },
  {
    level: 4,
    map: matrix(10),
    humanPlayer: [new Player()],
    computerOpponents: [
      new AIPlayer('blue bear',"#009ACD","../images/blueBear.jpg", 0,3),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 3,3)
    ],
    maximumDuration: 15,
    starterText: "Round 3!! The fight continues..."
  },
  {
    level: 5,
    map: matrix(12),
    humanPlayer: [new Player()],
    computerOpponents: [
      new AIPlayer('blue bear',"#009ACD","../images/blueBear.jpg", 0,3),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 3,3),
      new AIPlayer("pink peacock", "pink", "../images/pinkPeacock.jpg", 7,7),
    ],
    maximumDuration: 15,
    starterText: "Round 3!! The fight continues..."
  }
]

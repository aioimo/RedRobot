
var levels = 
[
  {
    level: 1,
    map: matrix(6),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('blue bear',"#009ACD","../images/blueBear.jpg", 0,4),
      new EasyAI("pink peacock", "pink", "../images/pinkPeacock.jpg", 4,4),
      new EasyAI('green gorilla',"green", "../images/greenGorilla.png", 4,0)
    ],
    starterText: "Round 1!! \n This is an easy training round. The other characters aren't very bright...yet. \n Move around with ARROW KEYS and score points by having your color on the board. You can cover up another player's color, but watch out, they can cover up yours too. The round ends as soon as there's no white space on the board."
  },
  {
    level: 2,
    map: matrix(4),
    humanPlayer: [new Player()],
    computerOpponents: [
      new AIPlayer('blue bear',"#009ACD","../images/blueBear.jpg", 0,3),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 3,3)
    ],
    starterText: "Round 2!!"
  }
]

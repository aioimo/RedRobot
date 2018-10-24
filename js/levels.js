
var levels = 
[
  {
    level: 1,
    map: matrix(7),
    humanPlayer: [new Player("#A5243D")],
    computerOpponents: [
      new EasyAI('Blue Bear',"#17BEBB","../images/blueBear.jpg", 0,4),
      new EasyAI("Puce Peacock", "#4B1D3F", "../images/pinkPeacock.png", 4,4),
      new EasyAI('Pigeon',"#0E7C7B", "../images/pigeonSquare.png", 4,0)
    ],
    maximumDuration: 20,
    starterText: "Round 1 – This is an easy training round. The other characters aren't very bright...yet. Remember, the round ends when there's no white space left on the board.",
    scoreBoardColor: "#33032F",
    backgroundColor: "white"
  },
  {
    level: 2,
    map: matrix(6),
    humanPlayer: [new Player("#FF0000")],
    computerOpponents: [
      new EasyAI('blue bear',"#EF8A17","../images/blueBear.jpg", 2,1),
      new AIPlayer('green gorilla',"#C6C013", "../images/greenGorilla.png", 5,5),
      new EasyAI("pink peacock", "#087F8C", "../images/pinkPeacock.png", 3,4),
    ],
    maximumDuration: 18,
    starterText: "Round 2 -- The other plays are a little smarter now. Just a little.",
    scoreBoardColor: "#242F40",
    backgroundColor: "white"
  },


  {
    level: 3,     //2 v. 1
    map: matrix(8),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('green gorilla',"green", "../images/greenGorilla.png", 4,4),
      new EasyAI('blue bear',"green","../images/blueBear.jpg", 3,3),
    ],
    maximumDuration: 10,
    starterText: "Round 3 – 2 against 1",
    scoreBoardColor: "#black",
    backgroundColor: "white"
  },
  {
    level: 4,
    map: matrix(12),
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('blue bear',"#009ACD","../images/blueBear.jpg", 0,3),
      new AIPlayer('green gorilla',"green", "../images/greenGorilla.png", 3,3),
      new FairAI("pink peacock", "#FF69B4", "../images/pinkPeacock.png", 7,7),
    ],
    maximumDuration: 15,
    starterText: "Round 4",
    soreBoardColor: "black",
    backgroundColor: "white"
  },
  {
    level: 5,
    map: matrix(14),
    humanPlayer: [new Player()],
    computerOpponents: [
      new FairAI('blue bear',"#009ACD","../images/blueBear.jpg", 13,13),
      new FairAI('green gorilla',"green", "../images/greenGorilla.png", 0,13),
      new FairAI("pink peacock", "pink", "../images/pinkPeacock.png", 13,0),
    ],
    maximumDuration: 12,
    starterText: "Round 3!! The fight continues...",
    scoreBoardColor: "#black",
    backgroundColor: "white"
  }
]

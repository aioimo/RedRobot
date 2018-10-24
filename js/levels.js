
var levels = 
[
  {
    level: 1,
    map: matrix(7),
    humanPlayer: [new Player("#A5243D")],
    computerOpponents: [
      new EasyAI('Raven',"#17BEBB","../images/raven.png", 0,4),
      new EasyAI("Kangaroo Rat", "#4B1D3F", "../images/kangarooRat.png", 4,4),
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
      new EasyAI('blue bear',"#EF8A17","../images/blueBear.jpg", 4,1),
      new AIPlayer('green gorilla',"#C6C013", "../images/greenGorilla.png", 5,5),
      new EasyAI("pink peacock", "#242F40", "../images/pinkPeacock.png", 1,4),
    ],
    maximumDuration: 18,
    starterText: "Round 2 -- The other plays are a little smarter now. Just a little.",
    scoreBoardColor: "#087F8C",
    backgroundColor: "white"
  },


  {
    level: 3,     //2 v. 1
    map: matrix(9),
    humanPlayer: [new Player('#DE3C4B')],
    computerOpponents: [
      new EasyAI('Fish 1',"#FFBA49", "../images/fishColorful.png", 5,5),
      new EasyAI('Fish 2',"#FFBA49","../images/fishYellow.png", 6,6),
    ],
    maximumDuration: 10,
    starterText: "Round 3 – 2 against 1",
    scoreBoardColor: "#23001E",
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
    starterText: "Round 5!! The fight continues...",
    scoreBoardColor: "black",
    backgroundColor: "white"
  },
  {
    level: 6,
    map: matrix(14),
    humanPlayer: [new Player()],
    computerOpponents: [
      new FairAI('blue bear',"#009ACD","../images/blueBear.jpg", 13,13),
      new FairAI('green gorilla',"green", "../images/greenGorilla.png", 0,13),
      new FairAI("pink peacock", "pink", "../images/pinkPeacock.png", 13,0),
    ],
    maximumDuration: 12,
    starterText: "Round 6!! The fight continues...",
    scoreBoardColor: "black",
    backgroundColor: "white"
  },
  {
    level: 7,
    map: matrix(14),
    humanPlayer: [new Player()],
    computerOpponents: [
      new FairAI('blue bear',"#009ACD","../images/blueBear.jpg", 13,13),
      new FairAI('green gorilla',"green", "../images/greenGorilla.png", 0,13),
      new FairAI("pink peacock", "pink", "../images/pinkPeacock.png", 13,0),
    ],
    maximumDuration: 12,
    starterText: "Round 7!! The fight continues...",
    scoreBoardColor: "black",
    backgroundColor: "white"
  },
  {
    level: 8,
    map: matrix(14),
    humanPlayer: [new Player()],
    computerOpponents: [
      new FairAI('blue bear',"#009ACD","../images/blueBear.jpg", 13,13),
      new FairAI('green gorilla',"green", "../images/greenGorilla.png", 0,13),
      new FairAI("pink peacock", "pink", "../images/pinkPeacock.png", 13,0),
    ],
    maximumDuration: 12,
    starterText: "Round 8!! The fight continues...",
    scoreBoardColor: "black",
    backgroundColor: "white"
  },
  {
    level: 9,
    map: matrix(14),
    humanPlayer: [new Player()],
    computerOpponents: [
      new FairAI('blue bear',"#009ACD","../images/blueBear.jpg", 13,13),
      new FairAI('green gorilla',"green", "../images/greenGorilla.png", 0,13),
      new FairAI("pink peacock", "pink", "../images/pinkPeacock.png", 13,0),
    ],
    maximumDuration: 12,
    starterText: "Round 9!! This one is really hard.",
    scoreBoardColor: "black",
    backgroundColor: "white"
  }
]

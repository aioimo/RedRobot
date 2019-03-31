const levels = [
  {
    level: 1,
    mapSize: 7,
    humanPlayer: [new Player('#D62828')],
    computerOpponents: [
      new EasyAI('Brown Cow', '#7F3122', './images/cow.png', 6, 3),
      new EasyAI('Chicken', '#E6AA68', './images/chicken.png', 3, 6)
    ],
    maximumDuration: 20,
    starterText: [
      'Round 1',
      'Training round',
      'Remember: You want the most points!',
      "Remember: the round ends when there's no more available white space. left on the board."
    ],
    scoreBoardColor: '#003049',
    backgroundColor: 'white'
  },
  {
    level: 2,
    mapSize: 8,
    humanPlayer: [new Player('#A5243D')],
    computerOpponents: [
      new MediumAI('Raven', '#17BEBB', './images/raven.png', 6, 6),
      new EasyAI('Kangaroo Rat', '#4B1D3F', './images/kangarooRat.png', 3, 5),
      new EasyAI('Pigeon', '#0E7C7B', './images/pigeonSquare.png', 5, 3)
    ],
    maximumDuration: 16,
    starterText: [
      'Round 2',
      'The other plays are a little smarter now. Just a little.'
    ],
    scoreBoardColor: '#33032F',
    backgroundColor: 'white'
  },

  {
    level: 3, //2 v. 1
    mapSize: 9,
    humanPlayer: [new Player('#DE3C4B')],
    computerOpponents: [
      new EasyAI('Team Fish', '#FFBA49', './images/fishColorful.png', 5, 5),
      new MediumAI('Team Fish', '#FFBA49', './images/fishYellow.png', 6, 6)
    ],
    maximumDuration: 10,
    starterText: ['Round 3', 'Those fish are friends.', '2  against  1'],
    scoreBoardColor: '#23001E',
    backgroundColor: 'white'
  },
  {
    level: 4,
    mapSize: 12,
    humanPlayer: [new Player('#F61067')],
    computerOpponents: [
      new MediumAI('Butterfly', '#5E239D', './images/blueButterfly.png', 11, 6),
      new PlayerAI(
        'Pretty Butterfly',
        '#6DECAF',
        './images/prettyButterfly.png',
        6,
        6
      ),
      new FairAI(
        'Monarch Butterfly',
        '#E6AF2E',
        './images/monarchButterfly.png',
        11,
        11
      ),
      new EasyAI(
        'Dark Butterfly',
        '#226F54',
        './images/darkButterfly.png',
        6,
        11
      )
    ],
    maximumDuration: 15,
    starterText: ['Round 4'],
    scoreBoardColor: '#E6AF2E',
    backgroundColor: 'white'
  },
  {
    level: 5,
    mapSize: 14,
    humanPlayer: [new Player('#DB162F')],
    computerOpponents: [
      new FairAI('Zebra', '#1B1B1E', './images/zebra.png', 0, 13),
      new PlayerAI('Lion', '#F18F01', './images/lion.png', 5, 5),
      new FairAI('Elephant', '#698196', './images/elephant.png', 13, 0)
    ],
    maximumDuration: 16,
    starterText: ['Round 5'],
    scoreBoardColor: '#550C18',
    backgroundColor: 'white'
  },
  {
    level: 6,
    mapSize: 14,
    humanPlayer: [new Player('#764134')],
    computerOpponents: [
      new EasyAI(
        'Team Green Gorilla',
        '#8FB339',
        './images/greenGorilla.png',
        7,
        10
      ),
      new FairAI(
        'Team Green Gorilla',
        '#8FB339',
        './images/greenGorilla.png',
        10,
        10
      ),
      new EasyAI(
        'Team Green Gorilla',
        '#8FB339',
        './images/greenGorilla.png',
        10,
        7
      )
    ],
    maximumDuration: 12,
    starterText: ['Round 6', '3 vs. 1'],
    scoreBoardColor: '#003B36',
    backgroundColor: 'white'
  },
  {
    level: 7,
    mapSize: 14,
    humanPlayer: [new Player()],
    computerOpponents: [
      new PlayerAI(
        'Capuchin Monkey',
        '#335C67',
        './images/capuchinMonkey.png',
        13,
        13
      ),
      new FairAI(
        'Bearded Dragon',
        '#B1B695',
        './images/beardedDragon.jpg',
        0,
        13
      ),
      new FairAI('Parrot', '#FCD0A1', './images/parrot.png', 13, 0),
      new PlayerAI('Tiger', '#E09F3E', './images/tiger.png', 5, 5)
    ],
    maximumDuration: 14,
    starterText: ['Round 7'],
    scoreBoardColor: '#540B0E',
    backgroundColor: 'white'
  },
  {
    level: 8,
    mapSize: 15,
    humanPlayer: [new Player('#5C0029')],
    computerOpponents: [
      new PlayerAI('Penguin', '#8AA29E', './images/penguin.png', 10, 10),
      new PlayerAI('Polar Bear', '#531CB3', './images/polarBear.png', 0, 7),
      new PlayerAI('Owl', '#DCEDFF', './images/owl.png', 7, 0)
    ],
    maximumDuration: 16,
    starterText: ['Round 8'],
    scoreBoardColor: '#531CB3',
    backgroundColor: 'white'
  },
  {
    level: 9,
    mapSize: 20,
    humanPlayer: [new Player()],
    computerOpponents: [
      new EasyAI('Another Pigeon', '#009ACD', './images/pigeon.png', 10, 0),
      new PlayerAI(
        'Green Gorillas',
        'green',
        './images/greenGorilla.png',
        1,
        19
      ),
      new PlayerAI(
        'Green Gorillas',
        'green',
        './images/greenGorilla.png',
        0,
        18
      ),
      new PlayerAI('Pink Peacock', 'pink', './images/pinkPeacock.png', 2, 2),
      new PlayerAI('Lion', 'orange', './images/lion2.png', 19, 19)
    ],
    maximumDuration: 20,
    starterText: ['Round 9', 'i.e. the Final Round'],
    scoreBoardColor: 'black',
    backgroundColor: 'white'
  }
];

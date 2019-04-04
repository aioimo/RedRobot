//Setup the Canvas and its dimensions
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

//Setup global variables for layout
const xDisplacement = 30;
const yDisplacement = 30;

const gameBoardXDisplacement = width - height + xDisplacement;
const gameBoardYDisplacement = yDisplacement;

const levelWithHumanPlayers = false;

const activeLevels = levelWithHumanPlayers ? levels : levelsNoHuman;

//Initialize game variable and set levelCounter to 0
var levelCounter = 0;
var game;
var interval;
var winners = [];

//Select DOM elements
const playButton = document.getElementById('play');
const howToButton = document.getElementById('how-to');
const levelsDivs = document.querySelectorAll('.level');

//Add click listener to How to Play button
howToButton.onclick = function() {
  const instructions = new Instructions(ctx);
  instructions.blackScreen();
  instructions.displayText();
};

for (let i = 0; i < levelsDivs.length; i++) {
  levelsDivs[i].addEventListener('click', function(e) {
    levelCounter = Number(e.target.getAttribute('data-level')) - 1;
    setPlayBtn('PLAY');
  });
}

function setPlayBtn(status) {
  playButton.innerText = `${status} LEVEL ` + (levelCounter + 1);
}

function setupGame() {
  setPlayBtn('RESTART');
  let {
    mapSize,
    humanPlayer,
    computerOpponents,
    starterText,
    maximumDuration,
    scoreBoardColor,
    backgroundColor
  } = activeLevels[levelCounter];

  game = new Game(
    ctx,
    createGameBoard(mapSize),
    humanPlayer,
    computerOpponents,
    starterText,
    maximumDuration,
    scoreBoardColor,
    backgroundColor
  );
  game.start();
}

//Setup game, add eventListener to keyboard to handle player movement
playButton.onclick = function() {
  if (game != undefined) {
    clearInterval(interval);
    game.reset();
  }
  setupGame();

  if (!game.includesHumanPlayer()) {
    window.removeEventListener('keydown', handlePlayerMovement);
    handleGameWithoutHuman();
  } else {
    window.addEventListener('keydown', handlePlayerMovement);
  }
};

//Handle Loop logic for Game without Human
const handleGameWithoutHuman = () => {
  interval = setInterval(() => {
    if (!game.checkGameOver()) {
      game.update();
    } else {
      recordWinner();
      clearInterval(interval);
      restartGameWithoutHuman();
    }
  }, 35);
};

//Handle Logic for Human Player Movement
const handlePlayerMovement = e => {
  e.preventDefault();
  const humanPlayer = game.humanPlayers[0];
  if (!game.checkGameOver()) {
    if (e.key === 'ArrowUp') {
      if (
        humanPlayer.evaluateCoordinate(humanPlayer.y - 1, humanPlayer.x) > 0
      ) {
        humanPlayer.executeMove('north');
      }
      game.update();
    } else if (e.key === 'ArrowDown') {
      if (
        humanPlayer.evaluateCoordinate(humanPlayer.y + 1, humanPlayer.x) > 0
      ) {
        humanPlayer.executeMove('south');
      }
      game.update();
    } else if (e.key === 'ArrowRight') {
      if (
        humanPlayer.evaluateCoordinate(humanPlayer.y, humanPlayer.x + 1) > 0
      ) {
        humanPlayer.executeMove('east');
      }
      game.update();
    } else if (e.key === 'ArrowLeft') {
      if (
        humanPlayer.evaluateCoordinate(humanPlayer.y, humanPlayer.x - 1) > 0
      ) {
        humanPlayer.executeMove('west');
      }
      game.update();
    }
  }
  while (!humanPlayer.connected && !game.checkGameOver()) {
    game.update();
  }
};

const recordWinner = () => {
  const winner = game.allPlayers[0].name;
  winners.push(winner);
  console.log('Total games: ', winners.length, ':', statistics(winners)[1]);
};

const restartGameWithoutHuman = () => {
  game.reset();
  setupGame();
  handleGameWithoutHuman();
};

const statistics = winners => {
  let winCount = {};
  winners.forEach(winner => {
    if (winCount[winner]) winCount[winner]++;
    else winCount[winner] = 1;
  });
  let percentage = {};
  winners.forEach(winner => {
    percentage[winner] =
      Math.round((winCount[winner] / winners.length) * 100) + '%';
  });
  return [winCount, percentage];
};

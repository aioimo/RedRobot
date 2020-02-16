//Select DOM elements
const $play = document.getElementById('play');
const $howToPlay = document.getElementById('how-to');
const $levels = document.querySelectorAll('.level');
const $isWithHumanPlayer = document.getElementById('includes-human-player');

//Initialize game variable and set currentLevel to 0
var currentLevel = 0;
var game;
var interval;
var winners = []; //array of statistics
var withHuman = $isWithHumanPlayer.checked;

//Add click listener to How to Play button
$howToPlay.onclick = function() {
  const instructions = new Instructions(ctx);
  instructions.blackScreen();
  instructions.displayText();
};

$isWithHumanPlayer.onchange = function(e) {
  withHuman = e.target.checked;
};

for (let i = 0; i < $levels.length; i++) {
  $levels[i].addEventListener('click', function(e) {
    currentLevel = Number(e.target.getAttribute('data-level')) - 1;
    resetWinners();
    setPlayBtn('PLAY');
  });
}

function setPlayBtn(status) {
  $play.innerText = `${status} LEVEL ` + (currentLevel + 1);
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
  } = levels[currentLevel];

  game = new Game(
    ctx,
    createGameBoard(mapSize),
    humanPlayer,
    withHuman,
    computerOpponents,
    starterText,
    maximumDuration,
    scoreBoardColor,
    backgroundColor
  );
  game.start();
}

//Setup game, add eventListener to keyboard to handle player movement
$play.onclick = function() {
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

const resetWinners = () => (winners = []);

const recordWinner = () => {
  const winner = game.allPlayers[0].name;
  winners.push(winner);
  console.log('Total games: ', winners.length, ':', statistics(winners)[1]);
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

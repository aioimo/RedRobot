
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width
var height = canvas.height

var xDisplacement = 30;
var yDisplacement = 30;

var gameBoardXDisplacement = width-height+xDisplacement;
var gameBoardYDisplacement = yDisplacement;

var levelCounter = 0;
var game;



// ctx.fillRect(0,0,width,height);



var playButton = document.getElementById('play');
var howToButton = document.getElementById('how-to');

var levelsDivs =  document.querySelectorAll('.level')

for (var i = 0; i<levelsDivs.length;i++) {
  levelsDivs[i].addEventListener("click",function(e){
    levelCounter = Number(e.target.getAttribute('data-level'))-1;
    setPlayBtn();
  })
}

howToButton.onclick = function() {
  var instructions = new Instructions(ctx);
  instructions.blackScreen();
  instructions.displayText();
}

function setRestartBtn() {
  playButton.innerText = "RESTART LEVEL " + (levelCounter+1);
}

function setPlayBtn() {
  playButton.innerText = "PLAY LEVEL " + (levelCounter+1);
}



var playerMovement = function(e) {
  e.preventDefault();
  if (!game.checkGameOver()) {
    if (e.key === "ArrowUp") {
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y-1,game.humanPlayers[0].x)>0){
        game.humanPlayers[0].executeMove('north');
      }
      game.update();
    } else if (e.key === "ArrowDown") {
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y+1,game.humanPlayers[0].x)>0){
        game.humanPlayers[0].executeMove('south');
      }
      game.update();
    } else if (e.key === "ArrowRight") {
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y,game.humanPlayers[0].x+1)>0){
        game.humanPlayers[0].executeMove('east');
      }
      game.update(); 
    } else if (e.key === "ArrowLeft") {
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y,game.humanPlayers[0].x-1)>0){
        game.humanPlayers[0].executeMove('west');   
      }
      game.update(); 
    }
  } 
  while (!game.humanPlayers[0].connected && !game.checkGameOver()){
    game.update();
  }
}

playButton.onclick = function() {
  if (game != undefined) game.reset();
  setRestartBtn();
  game = new Game(ctx,levels[levelCounter].map,levels[levelCounter].humanPlayer,levels[levelCounter].computerOpponents, levels[levelCounter].starterText, levels[levelCounter].maximumDuration,levels[levelCounter].scoreBoardColor, levels[levelCounter].backgroundColor);
  var robot = game.humanPlayers[0]
  game.start();
  window.addEventListener('keydown',playerMovement);
}
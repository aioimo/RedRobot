
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



ctx.fillRect(0,0,width,height);



var playButton = document.getElementById('play');
var howToButton = document.getElementById('how-to');
var level1 = document.getElementById('level-1');
var level2 = document.getElementById('level-2');

howToButton.onclick = function() {
  var instructions = new Instructions(ctx);
  instructions.blackScreen();
  instructions.displayText();
}

level1.onclick = function() {
  levelCounter = 0;
  setPlayBtn();
}

level2.onclick = function() {
  levelCounter = 1;
  setPlayBtn();
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
      console.log("arrow up")
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y-1,game.humanPlayers[0].x)>0){
        game.humanPlayers[0].executeMove('north');
      }
      game.update();
    } else if (e.key === "ArrowDown") {
      console.log("arrow down")
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
  if (game.checkRedRobotWin()) {
    levelCounter++;
    setPlayBtn();
  }
}

playButton.onclick = function() {
  if (game != undefined) game.reset();
  setRestartBtn();
  console.log(levels[levelCounter].map,levels[levelCounter].humanPlayer,levels[levelCounter].computerOpponents)
  game = new Game(ctx,levels[levelCounter].map,levels[levelCounter].humanPlayer,levels[levelCounter].computerOpponents, levels[levelCounter].starterText, levels[levelCounter].maximumDuration);
  game.start();
  window.addEventListener('keydown',playerMovement);
}

/*
window.addEventListener('keydown',function(e){
  console.log(e)
  e.preventDefault();
  if (!game.checkGameOver()) {
    if (e.key === "ArrowUp") {
      console.log("arrow up")
      if (game.humanPlayers[0].evaluateCoordinate(game.humanPlayers[0].y-1,game.humanPlayers[0].x)>0){
        game.humanPlayers[0].executeMove('north');
      }
      game.update();
    } else if (e.key === "ArrowDown") {
      console.log("arrow down")
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
})

*/


// startButton.onclick = function(){
//   console.log("start button clicked")
//   game.draw();
// }

/*
window.addEventListener('keydown',function(e){
  if(!game.checkGameOver()){
    if (e.key === "ArrowUp") {
      if (player.evaluateCoordinate(player.y-1,player.x)>0){
        player.executeMove('north');
      }
      game.update();
    } else if (e.key === "ArrowDown") {
      if (player.evaluateCoordinate(player.y+1,player.x)>0){
        player.executeMove('south');
      }
      game.update();
    } else if (e.key === "ArrowRight") {
      if (player.evaluateCoordinate(player.y,player.x+1)>0){
        player.executeMove('east');
      }
      game.update(); 
    } else if (e.key === "ArrowLeft") {
      if (player.evaluateCoordinate(player.y,player.x-1)>0){
        player.executeMove('west');   
      }
      game.update(); 
    }
  }
})
*/
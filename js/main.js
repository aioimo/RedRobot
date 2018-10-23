
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width
var height = canvas.height

var xDisplacement = 30;
var yDisplacement = 30;

var levelCounter = 0;
var game;





var playButton = document.getElementById('play');

function setRestartBtn() {
  playButton.innerText = "RESTART";
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
  game = new Game(ctx,levels[levelCounter].map,levels[levelCounter].humanPlayer,levels[levelCounter].computerOpponents);
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
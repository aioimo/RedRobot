
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width
var height = canvas.height

var xDisplacement = 20;
var yDisplacement = 20;

var levelCounter = 0;
var game;

// var size = 6;

// var game = new GameBoard(ctx,size);

// var player = new Player(game.gameBoard);
// var comp2 = new AIPlayer('blue bear',"#009ACD", game.gameBoard,"../images/blueBear.jpg", 0,size-1);
// var comp3 = new AIPlayer("pink peacock", "pink", game.gameBoard, "../images/pinkPeacock.jpg", size-1,0);
// var comp4 = new AIPlayer('green gorilla',"green",game.gameBoard, "../images/greenGorilla.png", size-1,size-1);

// game.addHumanPlayer(player)
// game.addComputerPlayer(comp2)
// game.addComputerPlayer(comp3)
// game.addComputerPlayer(comp4)




var startButton = document.getElementById("start");
var playButton = document.getElementById('play');
// var moveButton = document.getElementById("move");
// var goUntilButton = document.getElementById("goUntil");
var resetButton = document.getElementById("reset");

resetButton.onclick = function() {
  console.log('reset button pressed');
  game.reset();
}


playButton.onclick = function() {
  game = new Game(ctx,levels[0].map,levels[0].humanPlayer,levels[0].computerOpponents);
  game.start();
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
}




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
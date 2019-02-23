# The Red Robot and the Color Crusades

## Introduction

Red Robot is a 1-player puzzle game I built during the Ironhack bootcamp that runs in the browser. The player controls the Red Robot, trying to outmanoeuvre various colorful animal opponents, to get the most points.

The game can be played on Github Pages: https://aioimo.github.io/RedRobot/.

![alt text](https://user-images.githubusercontent.com/24706154/52619615-6a080180-2ea2-11e9-938c-afc45dd4ef92.png "Red Robot")

![alt text](https://user-images.githubusercontent.com/24706154/52620665-75106100-2ea5-11e9-9478-0510ea02b360.png "Red Robot")

![alt text](https://user-images.githubusercontent.com/24706154/52632929-283b8300-2ec3-11e9-8fa1-0a84e6d4f7bc.png "Red Robot")

![alt text](https://user-images.githubusercontent.com/24706154/52632985-55883100-2ec3-11e9-94ff-cd2f5c98778d.png "Red Robot")

## How to Play

- Use the arrow keys to move the Red Robot around the board.
- Each colored square left behind by each player is 1 point for that player.
- You can (and should) take points away from a player by covering up their color.
- If a colored square has been untouched for a certain number of moves, it will become impassable, designated by a thick black border.
- When a player no longer has access to a still-uncolored square, the player is out of the round.
- The round ends when all players have no access to a still-uncolored square, and the one with the most points is the winner of the round.

## Used technologies

- Vanilla JavaScript
- the canvas HTML element

## Opponents

The opponents configuration is in the `Players.js` file. There are currently 4 classes of AI player: `PlayerAI` , `EasyAI` , `MediumAI` , `FairAI` with their own moving behavior. These 4 classes inherit from the `Player`class.

To change how an opponent moves, update the return values of the corresponding `evaluateCoordinate(y,x)` method.

Do not change the `evaluateCoordinate(y,x)` method of the `Player`class or risk breaking the code.

## Levels

The game has 9 levels, but creating your own new level is straightforward. You have to add a Level object (like below) to the levels array in the `js/levels.js` file.

```
  {
    level: 10,
    map: createGameBoard(14),     //The size of the grid

    //The color of the human player, starting X coordinate, starting Y coordinate.
    humanPlayer: [new Player("#A5243D"), 0, 0],

    // Add opponents here with following parameters:
    // class of Computer Opponent, color, character Image, starting coordinate X, starting coordinate Y
    computerOpponents: [
      new MediumAI('Raven',"#17BEBB","./images/raven.png", 6,6),
      new EasyAI("Kangaroo Rat", "#4B1D3F", "./images/kangarooRat.png", 3,5),
      new PlayerAI('Pigeon',"#0E7C7B", "./images/pigeonSquare.png", 5,3)
    ],
    maximumDuration: 16,      //Number of turns until colored squares become impassable.
    starterText: ["Round 10", "A customized level."],
    scoreBoardColor: "#33032F",
    backgroundColor: "white"
  }
```

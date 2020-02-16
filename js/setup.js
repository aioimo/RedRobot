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

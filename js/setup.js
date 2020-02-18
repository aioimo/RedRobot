//Setup the Canvas and its dimensions
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const W_100 = canvas.width;
const H_100 = canvas.height;

//Setup global variables for layout
const X_DISPLACEMENT = 60;
const Y_DISPLACEMENT = 60;

const BOARD_X_DISPLACEMENT = W_100 - H_100 + X_DISPLACEMENT;

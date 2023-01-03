'use strict';

// Making the canvas (game board) for snake to navigate
const gameBoard = document.getElementById('gameBoard');
const gameBoard_ctx = gameBoard.getContext('2d');

// We specify initial location of snake on our board through an array of coordinates
// the x-coordinate decrements to represent the snake's body
let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},
];

//start game by hoisting main function
main();

// function called repeatedly to keep game going
function main() {
  reset();
  drawSnake();
}

// draws the canvas
function reset() {
  
  gameBoard_ctx.fillStyle = 'rgb(237, 237, 240)';
  gameBoard_ctx.strokeStyle = 'rgb(0, 0, 3)';
  gameBoard_ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
  gameBoard_ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);

};

// function to display on the canvas, drawing a rectangle for each set of coordinates
function createSnake(snakePart) {

  gameBoard_ctx.fillStyle = 'rgb(110, 240, 128)';
  gameBoard_ctx.strokeStyle = 'rgb(2, 38, 18)';
  gameBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);

};

// function to print the parts
function drawSnake() {
  snake.forEach(createSnake);
};

// here we create a new head and tehn  add the new head to the beginning, thus moving the snake: this is our horizontal movement
// dx is the x-axis coordinate in the destination canvas at which to place the top-left corner of the source image
// dy is the y-axis coordinate in the destination canvas
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}
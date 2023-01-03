'use strict';

// Making the canvas (game board) for snake to navigate
const gameBoard = document.getElementById('gameBoard');
const gameBoard_ctx = gameBoard.getContext('2d');

// We specify initial location of snake on our board through an array of coordinates
// the x-coordinate decrements to represent the snake's body
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

// dx is the x-axis coordinate in the destination canvas at which to place the top-left corner of the source image
// dy is the y-axis coordinate in the destination canvas
let dx = 10;
let dy = 0;

//start game by hoisting main function
main();

// we need an event listener to listen to when the key is pressed
document.addEventListener('keydown', changeDirection);

// function called repeatedly to keep game going
function main() {

  // hoist endGame function to stop play if snake hits sides of board
  if (endGame()) return;
  changeDirection = false;

  // utilizing setTimeout to auromatically move the snake, but with a slight delay so that the snake moves more fluidly
  // we also recursively call our main function so that the movement will continue
  setTimeout(function onTick() {
    reset();
    moveSnake();
    drawSnake();
    main();
  }, 100);
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
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
};

// function allows us to move snake via keyboard
// also checks to make sure that the snake cannot reverse
function changeDirection(event) {

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }

};

// function with conditional statements to end game if snake hits edges of board
function endGame() {
  for (let i = 4; i < snake.length; i++) {
    const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (hasCollided) {
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameBoard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameBoard.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};
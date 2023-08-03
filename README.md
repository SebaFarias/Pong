# Pong Challenge - AI Pong Game
![Pong Challenge Game Intro Banner](https://raw.githubusercontent.com/SebaFarias/Pong/master/imgs/Pong-Banner.jpeg)

## Overview
Welcome to Pong Challenge, the ultimate AI Pong game designed for developers! This project was initially created to revolutionize the classic Pong experience by introducing multiple balls bouncing around in a 100x100 matrix. Developers like you were encouraged to showcase their coding skills by implementing an intelligent algorithm to control the paddle and outwit the bouncing balls.

## Table of Contents
1. [Introduction](#introduction) 
2. [Game Rules](#game-rules)
3. [Installation](#installation)
4. [Getting Started](#getting-started)
5. [Function Details](#function-details)
6. [Example AI](#example-ai)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction
Pong Challenge was a groundbreaking project that combined the classic Pong game with a twist. Unlike the traditional version where you face off against one ball, in Pong Challenge, multiple balls appear on the screen, making it a thrilling and challenging experience. The aim was to create an intelligent AI function to control the paddle and prevent the balls from getting past it.
## Game Rules
- The game occurs in a 100x100 matrix.
- Developers are required to write an AI function that receives an array of Ball objects on each frame.
- Each Ball object contains the following attributes:
  - velX: The X-axis velocity of the ball.
  - velY: The Y-axis velocity of the ball.
  - posX: The current X-axis position of the ball in the matrix.
  - posY: The current Y-axis position of the ball in the matrix.
- The AI function should analyze the ball's positions and velocities and determine the optimal movement for the paddle to prevent the balls from reaching it's side of the matrix.
- Developers can implement their AI using Vanilla JavaScript.
## Installation
To set up Pong Challenge on your local machine, follow these steps:

1. Clone the Pong Challenge repository:
```bash
git clone https://github.com/sebafarias/pong.git
```
2. Change directory to the cloned repository:
```bash
cd pong
```
3. Open the index.html file in your preferred browser to play the game.
## Getting Started
To get started with Pong Challenge, follow these steps:

Implement your AI function in the ai.js file.

Open the index.html file in your preferred browser to run the game.

The game loop will call your AI function on each frame with the array of Ball objects.

Implement your AI logic to control the paddle and respond accordingly to the ball positions.

Watch your AI in action and see how long it can keep the balls from reaching your side of the court!

## Function Details
Your AI function should have the following signature:

```javascript
function aiFunction(balls,pos) {
    // Implement your AI logic here
    // ...
    return paddleMovement;
}
```
balls: An array of Ball objects representing the current state of all balls in the game.

pos: An array with two integer values for the x and y position of the pallet [ posX, posY ]

paddleMovement: A value indicating the movement direction of the paddle (-1 for up, 0 for no movement, 1 for down).

## Example AI
```javascript
function aiFunction(balls, pos) {
  // Example AI logic: Move the paddle vertically towards the ball with the closest X-axis position
  // a boolean value to know in wich side of the screen is the pallet
  const leftside = pos[0]<50
  // a variable with the closest ball
  const targetBall = balls.reduce((acc, ball) => {
      if(leftSide)return ball.posX < acc.posX ? ball : acc;
      return ball.posX > acc.posX ? ball : acc;
  });

  if (targetBall.posY < pos[1]) {
      return -1; // Move paddle up
  } else if (targetBall.posY > pos[1]) {
      return 1; // Move paddle down
  } else {
      return 0; // No movement
  }
```
Please note that this is just a simple example to illustrate the AI logic; developers are encouraged to come up with more sophisticated strategies.

## Contributing
Although Pong Challenge is currently considered abandonware, we welcome any contributions and ideas from the developer community. If you have suggestions, bug fixes, or feature improvements, feel free to open a pull request.
## License
Pong Challenge is distributed under the [MIT License](./LICENSE.md). You are free to use, modify, and distribute the code as per the terms of this license.
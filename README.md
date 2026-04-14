# battleship.js - Battleship 
<a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>

## Description
The *idea* behind this project is to experiment and practice test driven development and object oriented programming in javascript.
## About The Project
<p align="center">
  <img height="350" src="https://raw.githubusercontent.com/jaws-1684/battleship/refs/heads/images/184554.png">
</p>

Battleship (also known as Battleships) is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet (https://en.wikipedia.org/wiki/Battleship_(game)). 

This project implements the game idea using javascript that runs in a browser environment and adds the possibility to play against not only a human but also a computer.


The following key features associated with ships handling deserve highlighting:

* **Drag and Drop placement** — they can be positioned by dragging them around on the current players board before the game starts
* **Rotation** — clicking the head or tail of any ship will rotate it horizontally or vertically
* **Randomise** — the fleet can be placed randomly
* **Computer** — the computer tracks successful hits and prioritises adjacent cells to hunt down the opponents ships
* **Two-player mode** — supports a pass-and-play mode with a "pass the device" screen between turns

### Built With

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)


---

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/jaws-1684/battleship.git
   ```
2. Navigate into the project directory
   ```sh
   cd battleship
   ```
3. Install dependencies
   ```sh
   npm install
   ```


---

## Usage

### Development server
```sh
npm run dev
```
Opens a live-reloading dev server powered by webpack-dev-server.

### Watch mode
```sh
npm run watch
```
Rebuilds automatically on file changes without starting a dev server.

### Production build
```sh
npm run build
```
Outputs optimised assets into the `dist/` folder.

### Run tests
```sh
npm test
```
Runs the Jest test suite covering `Ship`, `Player`, and `Gameboard` units.

### Deploy to GitHub Pages
```sh
npm run deploy
```
Builds the project and pushes the `dist/` folder to the `gh-pages` branch automatically.

---
## How to play
1. Ships are placed randomly on load — drag them to reposition or click their ends to rotate
2. Click Randomise to shuffle your fleet
3. Click Play to begin
4. Click a cell on the opponent's board to fire a missile
5. The computer fires back automatically
6. The first player to sink all enemy ships wins!


## Project Structure

```
battleship/
├── src/
│   ├── assets/             
│   ├── event_handlers/     [attack, drag, drop, rotate, reset… iifes]
│   ├── helpers/            
│   ├── models/             [ship, gameboard, player, computer classes]
│   ├── state/              [state and action handlers]
│   ├── templates/          [rendering helpers]
│   ├── battleship.js       [main controller]
│   ├── event_bus.js        [pub/sub event bus]
│   ├── param.js            [shared param store]
│   ├── index.js            [entry point]
│   ├── styles.css          
│   └── template.html       
├── test/                  
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── package.json
```


---

## Contributing
If you have some *amazing* improvement ideas *feel free* to contribute.

1. Clone this repo
2. Create your Feature Branch (`git checkout -b feature/my_amazing_feature`)
3. Commit your Changes (`git commit -m 'Add some amazing_feature'`)
4. Push to the Branch (`git push origin feature/amazing_feature`)
5. Open a Pull Request


---

## License

Distributed under the ISC License. See `LICENSE` for more information.

---

## Contact

GitHub: [jaws-1684](https://github.com/jaws-1684)
Project Link: [https://github.com/jaws-1684/battleship](https://github.com/jaws-1684/battleship)


---

## Acknowledgments
The following resources proved to be quite helpful:
* [The Odin Project](https://www.theodinproject.com)
* [Battleship-game.org](https://battleship-game.org/en/)
* [Webpack](https://webpack.js.org)
* [Jest](https://jestjs.io)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Battleship on Wikipedia](https://en.wikipedia.org/wiki/Battleship_(game))

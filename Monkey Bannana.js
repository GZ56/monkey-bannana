/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Monkey Bannana
@author: 

@tags: []
@addedOn: 2024-00-00
*/
const player = "m";
const banana = "b";
const obstacle = "o";

setLegend(
  [ player, bitmap`
.......00.......
....00000000....
...0000000000...
...0000000000...
..000000000000..
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..000000000000..
...0000000000...
....00000000....
......0000......` ],
  [ banana, bitmap`
................
................
................
................
......6660......
.....666666.....
....66666666....
....66666666....
.....666666.....
......6660......
................
................
................
................
................` ],
  [ obstacle, bitmap`
................
................
......4444......
.....444444.....
.....444444.....
......4444......
.....444444.....
.....444444.....
......4444......
................
................
................
................
................
................` ]
);

setSolids([obstacle]);

let level = 0;
let score = 0;
let health = 3;

const levels = [
  map`
m..o.
..b.o`,
  map`
m..o.b
......
b..o..
..o...`,
  map`
mo.o.b
.b..o.
...oo.
..b...`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

// Movement
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});

// Collision and game logic
afterInput(() => {
  const playerObj = getFirst(player);

  // Check for banana collection
  getAll(banana).forEach(bananaObj => {
    if (playerObj.x === bananaObj.x && playerObj.y === bananaObj.y) {
      bananaObj.remove();
      score += 10;
      if (getAll(banana).length === 0) {
        level++;
        if (level < levels.length) {
          setMap(levels[level]);
        } else {
          addText("You Win!", { y: 4, color: color`3` });
        }
      }
    }
  });

  // Check for obstacle collision
  getAll(obstacle).forEach(obstacleObj => {
    if (playerObj.x === obstacleObj.x && playerObj.y === obstacleObj.y) {
      playerObj.x = 0; // Reset player position on collision
      playerObj.y = 0;
      health--;
      if (health <= 0) {
        addText("Game Over", { y: 4, color: color`3` });
      }
    }
  });

  clearText();
  addText(`Score: ${score}`, { y: 1, color: color`2` });
  addText(`Health: ${health}`, { y: 2, color: color`4` });
});

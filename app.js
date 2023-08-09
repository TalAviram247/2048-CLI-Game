function isWon() {
  for (const row of arry2048) {
    for (const cell of row) {
      if (cell == 2048) return true;
    }
  }
  return false;
}

function isLost() {
  for (let i = 0; i < arry2048.length; i++) {
    for (let j = 0; j < arry2048[i].length; j++) {
      if (arry2048[i][j] == 0) return false;
    }
  }
  return true;
}
function generateNewNumber() {
  function RandomIndex(max) {
    return Math.floor(Math.random() * max);
  }
  function RandomTwoOrFour() {
    let num = Math.random();
    if (num <= 0.1) return 4;
    else return 2;
  }
  let i = RandomIndex(arry2048.length);
  let j = RandomIndex(arry2048.length);
  while (arry2048[i][j] != 0) {
    i = RandomIndex(arry2048.length);
    j = RandomIndex(arry2048.length);
  }
  arry2048[i][j] = RandomTwoOrFour();
}
function rotateClockwise(a) {
  var n = a.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = i; j < n - i - 1; j++) {
      var tmp = a[i][j];
      a[i][j] = a[n - j - 1][i];
      a[n - j - 1][i] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[j][n - i - 1];
      a[j][n - i - 1] = tmp;
    }
  }
  return a;
}

function _right() {
  function rowLogic(row) {
    function sqeezeZeros(row) {
      let newRow = [];
      let counter = 0;
      for (let i = 0; i < row.length; i++) {
        if (row[i] != 0) {
          newRow.push(row[i]);
        } else counter++;
      }
      while (counter--) newRow.unshift(0);
      return newRow;
    }
    // console.log(row);
    row = sqeezeZeros(row);
    for (let i = row.length - 1; i > 0; i--) {
      if (row[i] == row[i - 1]) {
        row[i - 1] = row[i] + row[i - 1];
        row[i] = 0;
        i--;
      }
    }
    row = sqeezeZeros(row);
    return row;
    // console.log(row);
  }
  arry2048[0] = rowLogic(arry2048[0]);
  arry2048[1] = rowLogic(arry2048[1]);
  arry2048[2] = rowLogic(arry2048[2]);
  arry2048[3] = rowLogic(arry2048[3]);
}

function moveLogic(dir) {
  const numOfMoves = { right: 0, up: 1, left: 2, down: 3 };
  for (let index = 0; index < numOfMoves[dir]; index++) {
    arry2048 = rotateClockwise(arry2048);
  }
  _right();
  for (let index = 0; index < 4 - numOfMoves[dir]; index++) {
    arry2048 = rotateClockwise(arry2048);
  }
}

function nextStep() {
  let exit = false;
  console.log("Press one button from:");
  console.log("for moving right press 'd'");
  console.log("for moving left press 'a'");
  console.log("for moving up press 'w'");
  console.log("for moving down press 's'");
  console.log("for EXIT press 'p'");
  let press = prompt("choose now and the press 'ENTER': ");
  console.log("press: " + press);
  while (!["d", "a", "w", "s", "p"].includes(press))
    press = prompt(
      "You entered unsupported char, please choose 'w','a','s' or 'd' and the press 'ENTER': "
    );

  let pressKey = { d: "right", a: "left", w: "up", s: "down" };
  if (press == "p") exit = true;
  else moveLogic(pressKey[press]);

  generateNewNumber();
  console.table(arry2048);
  console.log("---------------------------------------");
  return exit;
}

const prompt = require("prompt-sync")();
let userName = prompt("Welcome to 2048 Game! What is your first name? ");
userName = userName.replace(/ /g, "");
console.log(`${userName} let's start play:`);
let arry2048 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

generateNewNumber();
generateNewNumber();
console.table(arry2048);
console.log("---------------------------------------");

while (!(isWon() || isLost())) {
  if (nextStep()) break;
}

console.table(arry2048);

if (isWon()) console.log(`${userName} you won the game!`);
else console.log(`${userName} you lost the game!`);

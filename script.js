// Albert Cao

let list = [];
let size = 50;
let width = 960;
let graphHeight = 480;
let controlHeight = 40;
let boxWidth = width/size;
let boxHeight = null;

function setup() {
  createCanvas(width, graphHeight+controlHeight);

  randomiseButton = createButton('Randomise');
  randomiseButton.position(0, graphHeight);
  randomiseButton.mousePressed(randomise);

  sortButton = createButton('Sort');
  sortButton.position(200, graphHeight);

  for (let i = 0; i < size; i++) {
    list.push(i+1);
  }
} // setup

function draw() {
  background(220);

  // This draws the rectangles
  for (let i = 0; i < size; i++) {
    boxHeight = list[i]*graphHeight/size;
    // rect draws from top left corner
    rect(boxWidth*i, graphHeight-boxHeight, boxWidth, boxHeight);
  }
} // draw


function randomise() {
  // Figure out if this should be with or without replacement
  for (let i = 0; i < size; i++) {
    list[i] = Math.random()*size
  }
} // randomise

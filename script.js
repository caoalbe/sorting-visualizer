// Albert Cao

let list = [];
let size = 100; // lower bound is 1
let width = 920;
let graphHeight = 480;
let controlHeight = 40;
let boxWidth = width/size;
let boxHeight = null;
let swapSequence = []; // Queue of operations, refers to which swaps to make
let swapCount = 0 // the number of swaps used to sort

function setup() {
  createCanvas(width, graphHeight+controlHeight);

  randomiseButton = createButton('Randomise');
  randomiseButton.position(50, graphHeight+18);
  randomiseButton.mousePressed(randomise);

  selectionSortButton = createButton('Selection Sort');
  selectionSortButton.position(250, graphHeight+18);
  selectionSortButton.mousePressed(selectionSort);

  insertionSortButton = createButton('Insertion Sort');
  insertionSortButton.position(450, graphHeight+18);
  insertionSortButton.mousePressed(insertionSort);

  bubbleSortButton = createButton('Bubble Sort');
  bubbleSortButton.position(650, graphHeight+18);
  bubbleSortButton.mousePressed(bubbleSort);

  /*
  mergeSortButton = createButton('Merge Sort');
  mergeSortButton.position(800, graphHeight);
  mergeSortButton.mousePressed(mergeSort);
  */

  /*
  sizeField = createInput();
  sizeField.position(800, graphHeight);

  sizeSubmit = createButton('Size');
  sizeSubmit.position(900, graphHeight);
  sizeField.mousePressed(resetSketch);
  */

  for (let i = 0; i < size; i++) {
    list.push(i+1);
  }
} // setup

function draw() {
  background(220);
  //size = sizeSlider.value()
  //boxWidth = width/size;

  // make swap in list
  if (swapSequence.length != 0) {
    swap(list, swapSequence[0][0], swapSequence[0][1])
  }

  fill(0);
  text("Number of Swaps:" + swapCount, 20, 30);

  // This draws the rectangles
  for (var i = 0; i < size; i++) {
    boxHeight = list[i]*graphHeight/size;
    // rect draws from top left corner
    fill(255,204,0);
    if (size > 250) { // handle outlines
      noStroke()
    }
    if (swapSequence.length != 0) { // highlight swaps
      if (i == swapSequence[0][0] || i == swapSequence[0][1])
      fill(0)
    }
    rect(boxWidth*i, graphHeight-boxHeight, boxWidth, boxHeight);
  }

  // dequeue
  if (swapSequence.length != 0) {
    swapSequence.splice(0,1)
  }


} // draw


function randomise() {
  // randomises without replacement
  let bucket = [];
  let index = 0;

  for (let i = 0; i < size; i++) {
    bucket.push(i+1);
  }

  for (let i = 0; i < size; i++) {
    index = Math.floor(Math.random()*bucket.length);
    list[i] = bucket.splice(index, 1);
  }

} // randomise

function swap(array, index1, index2) {
  // swaps 2 values in <array> based on indices
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  swapCount++;
} // swap

function selectionSort() {
  // create copy of list to sort
  let copy = []
  for (let i = 0; i < size; i++) {
    copy.push(list[i])
  }

  swapCount = 0; // reset the swap count since its a new sort

  for (let i = 0; i < size; i++) {
    // Find the least value from unsorted onwards
    let leastIndex = i
    for (let j = i; j < size; j++) {
      if (copy[j][0] < copy[leastIndex][0]) {
        leastIndex = j
      }
    }
    if (leastIndex != i) {
      // swap
      swapSequence.push([leastIndex, i])
      swap(copy, leastIndex, i)
    }

  }
} // selectionSort

function insertionSort() {
  // create copy of list to sort
  let copy = []
  for (let i = 0; i < size; i++) {
    copy.push(list[i])
  }

  swapCount = 0; // reset the swap count since its a new sort

  for (let i = 1; i < size; i++) {
    // find where i is suppose to be placed
    for (let j = i-1; j >= 0; j--) {
      if (copy[j][0] > copy[j+1][0]) {
        //swap
        swapSequence.push([j, j+1])
        swap(copy, j, j+1)
      }
    }
  }
} // insertionSort

function bubbleSort() {
  // create copy of list to sort
  let copy = []
  for (let i = 0; i < size; i++) {
    copy.push(list[i])
  }

  swapCount = 0; // reset the swap count since its a new sort

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < size - 1; i++) {
      if (copy[i][0] > copy[i+1][0]) {
        // swap
        swapSequence.push([i, i+1]);
        swap(copy, i, i+1);
        swapped = true;
      }
    }
  } while (swapped);
} // bubbleSort

/*
function resetSketch() {
  size = sizeField.value();
  boxWidth = width/size;
  for (let i = 0; i < size; i++) {
    list.push(i+1);
  }
} // resetSketch
*/

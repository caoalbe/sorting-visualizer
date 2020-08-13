// Albert Cao

let list = [];
let size = 100; // lower bound is 1
let width = 920;
let graphHeight = 480;
let controlHeight = 40;
let boxWidth = width/size;
let boxHeight = null;
let swapSequence = []; // Queue of operations, refers to which swaps to make

function setup() {
  createCanvas(width, graphHeight+controlHeight);

  randomiseButton = createButton('Randomise');
  randomiseButton.position(0, graphHeight);
  randomiseButton.mousePressed(randomise);

  selectionSortButton = createButton('Selection Sort');
  selectionSortButton.position(200, graphHeight);
  selectionSortButton.mousePressed(selectionSort);

  insertionSortButton = createButton('Insertion Sort');
  insertionSortButton.position(400, graphHeight);
  insertionSortButton.mousePressed(insertionSort);

  bubbleSortButton = createButton('Bubble Sort');
  bubbleSortButton.position(600, graphHeight);
  bubbleSortButton.mousePressed(bubbleSort);

  mergeSortButton = createButton('Merge Sort');
  mergeSortButton.position(800, graphHeight);
  mergeSortButton.mousePressed(mergeSort);

  for (let i = 0; i < size; i++) {
    list.push(i+1);
  }
} // setup

function draw() {
  background(220);

  // make swap in list
  if (swapSequence.length != 0) {
    swap(list, swapSequence[0][0], swapSequence[0][1])
  }

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
} // swap

function selectionSort() {
  // create copy of list to sort
  let copy = []
  for (let i = 0; i < size; i++) {
    copy.push(list[i])
  }

  for (let i = 0; i < size; i++) {
    // Find the least value from unsorted onwards
    let leastIndex = i
    for (let j = i; j < size; j++) {
      if (copy[j][0] < copy[leastIndex][0]) {
        leastIndex = j
      }
    }
    // swap
    swapSequence.push([leastIndex, i])
    swap(copy, leastIndex, i)
  }
} // selectionSort

function insertionSort() {
  // create copy of list to sort
  let copy = []
  for (let i = 0; i < size; i++) {
    copy.push(list[i])
  }

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

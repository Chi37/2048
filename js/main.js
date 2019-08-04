/*----- constants -----*/

//maybe object of all the numbers so you can insert into dom element
//I went to places i couldn't go. like security alerts bc sites didn't have the green lock
const winningScore = 2048;


//TODO: add colors
const mapColors =  {
    2: '#e1deff'
    // 4: 
    // 8: 
    // 16:,
    // 32:,
    // 64:,
    // 128: 
    // 256: 
    // 512: 
    // 1024:,
    // 2048:,
    // 4096:,
    // 8192:,
    // 16384:,
    // 32768:,
    // 65536:,
    // 131072: 
};


 /*----- app's state (variables) -----*/ 
 let score, board, randomTwoTile

//  score
//  winner - dont need
//  board = a single array (maybe 2d arr)
//random2
//maybe create board through loops
board = [
   
]
score = 0;


/*----- cached element references -----*/
//cache board arrays to look up the individual cells later and check if it is 0 
//refer to render ^^^
//global scope var that you have access too
let cell = document.querySelector('cell');

/*----- event listeners -----*/ 
//on click to start game within game div
// listen to arrows r,l,u,d and then trigger function

/*----- functions -----*/
init();

// init() set up board 4x4 with all values set at 0
    //randomly pick two cells and set that to 2

function init() {
    let i = 0
   
    for (let i=0; i<=4; i++){
        board.push([0,0,0,0])
    }

    while (i<2){
    let num = randomCellGenerator();
    console.log(num + ' num')
    document.getElementById(`cell${num}`).textContent = 2;
    document.getElementById(`cell${num}`).style.backgroundColor = mapColors[2] ; //mapColor[2]
    i++ }

}
//can't decide if i choose a rnd from grid or rndRow and rndCol for board arr
function randomCellGenerator() {
    let rndRow, rndCol, val;
    do {
        rndRow = Math.floor(Math.random() * 4 );
        rndCol = Math.floor(Math.random() * 4 );
    }
    while (
        !!board[rndRow][rndCol])
    board[rndRow][rndCol] = 2;
    return rndRow * 4 + rndCol
}


document.addEventListener('keydown', updateBoard);

function updateBoard(e){
    switch (e.keyCode) {
        case 37: 
            console.log('leftFunc')
            break;
        case 38: 
            console.log('upFunc')
            break;
        case 39: 
            console.log('rightFunc')
            break;
        case 40: 
            console.log('downFunc')
            break;
        default:
            break;
    }
}









// function updateBoard(rndRow, rndCol, val){
//     console.log(rndRow + ' updateboard row idx');
//     board[rndRow][rndCol] = val;
// }

// ROWINDEX * ROW[0].LENGTH = COLINDEX === CELL#

//render()
//when div is clicked, init()
//when arrow is pressed.... 
    //FIGURE ALGORITHM LOL
    //rightArrow function, left,up,down functions
        //loop through array, or maybe loop through certain arrays and check
        //if values at indices are 0 vs diff # vs same #
//Add values function - add values IF the 2 cells are same 

//within the functions l,r,u,d call calculateScore();


//CALCULATE SCORES - loop through the array and add the digits; and set score to that
//add that score in DOM to display

// document.addEventListener('keypress',function(e){
//     console.log(e)})

// }






// POSSIBLE SOLUTION FOR MOVING ITEMS [unshift for sliding to right]

// arr = [0,1,1,0];
// arr= [2,1,0,1]
// let newA
// for (let i = 0; i<4; i++){
//   let zeroes ;
//   newA = arr.filter(val => val);
//   zeroes = arr.length - newA.length;
//   var z = 0;
//   while( z<zeroes){
//     console.log(newA.push(0));
//     z++;
//   }
// console.log(newA)
// }
/*----- constants -----*/

//maybe object of all the numbers so you can insert into dom element
const winningScore = 2048;
const map = {
    1: [0][0],
    14: [3][1]

}


 /*----- app's state (variables) -----*/ 
 let score, board, randomTwoTile

//  score
//  winner - dont need
//  board = a single array (maybe 2d arr)
//random2
board = [
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,0],
    [0,0,0,0]
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
    while (i<2){
    let num = randomCellGenerator();
    document.getElementById(`cell${num}`).textContent = 2;
    i++}
}
//can't decide if i choose a rnd from grid or rndRow and rndCol for board arr
function randomCellGenerator() {
    let rndCell = Math.floor(Math.random() * 16 );
    return rndCell;

}



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

document.addEventListener('keypress',function(e){
    console.log(e)})


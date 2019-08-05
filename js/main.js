/*----- constants -----*/

//maybe object of all the numbers so you can insert into dom element
//I went to places i couldn't go. like security alerts bc sites didn't have the green lock
const winningScore = 2048;


//TODO: add colors
const mapColors =  {
    2: '#e1deff',
    4: 'red'
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
 let score, board, randomTwoTile, num

    board = [];
    score = 0;


/*----- cached element references -----*/
//cache board arrays to look up the individual cells later and check if it is 0 

let cell = document.getElementById(`cell${num}`)
    // .textContent = 2;
    // document.getElementById(`cell${num}`).style.backgroundColor = mapColors[2] ;

/*----- event listeners -----*/ 
document.addEventListener('keydown', updateBoard);

// TODO:

//add reset button. On click call init

/*----- functions -----*/
init();

function init() {
    let i = 0
   
    for (let i=0; i<=4; i++){
        board.push([0,0,0,0])
    }

    while (i<2){
    num = randomCellGenerator();
    console.log(num + ' num')
    document.getElementById(`cell${num}`).textContent = 2;
    document.getElementById(`cell${num}`).style.backgroundColor = mapColors[2] ; //mapColor[2]
    i++ }

}


function randomCellGenerator() {
    let rndRow, rndCol, val;
    val = 2;
    do {
        rndRow = Math.floor(Math.random() * 4 );
        rndCol = Math.floor(Math.random() * 4 );
    }
    while ( !!board[rndRow][rndCol] );

    board[rndRow][rndCol] = val;
    return getBoardCell(rndRow, rndCol);
}


//algorthm for which cell to update in DOM based on row and column indices
function getBoardCell(row,col){
    return row * 4 + col;
}

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

// board = [[4,2,0,0],[0,4,2,0]]

function render(){
    board.forEach(row => {
        row.forEach(cell => {
            let num = getBoardCell(board.indexOf(row),row.indexOf(cell));
            console.log(num)
            document.getElementById(`cell${num}`).textContent = cell;
            document.getElementById(`cell${num}`).style.backgroundColor = mapColors[cell]
        });
        
    });
}






function moveRight(matrix){

}

function slide(){

}

function combine(){
    
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
// arr= [[2,1,0,1],
//       [1,0,1,0],
//       [1,0,1,0],
//       [0,1,1,1]]

// let newA;
// function slide(arr){
// for (let i = 0; i<4; i++){
//   let zeroes ;
//   newA = arr[i].filter(val => val);
//   zeroes = arr.length - newA.length;
//   var z = 0;
//   while( z<zeroes){
//     newA.push(0);
//     z++;
//   }
// arr[i] = newA;
// }
// }
//slide,combine,slide Left push
// board = [[0,0,0,0],[0,0,0,0]];

// board[0] = newA.arr

// function combine(arr) {
// for (let i = 0; i<4; i++){

//   for (let j=i+1; j<4;j++) {
//      if (arr[i] === arr[j] && !!arr[i] && !!arr[j]){
//        console.log(`at loop j${j} arr is ${arr}`)
//       let add = arr[j] + arr[j];
//       arr[i] = add;
//       arr[j] = 0;
//       console.log(arr)
//     }
//   }
// }

// }
// function combineR(arr) {
// for (let i = 0; i<4; i++){

//   for (let j=3; j>=0;j--) {
//      if (arr[i][j] === arr[i][j-1]){
//        console.log(`at loop j${j} arr is ${arr}`);
//       arr[i][j] *=2;
//       arr[i][j-1] = 0;
//     }
//   }
// }

// }

// arr.forEach(slide);

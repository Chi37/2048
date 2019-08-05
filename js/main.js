/*----- constants -----*/

//maybe object of all the numbers so you can insert into dom element
//I went to places i couldn't go. like security alerts bc sites didn't have the green lock
const winningScore = 2048;


//TODO: add colors
const mapColors =  {
    0:'thistle',
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

let cell = document.getElementById('cell') 
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
   
    for (let i=0; i<4; i++){
        board.push([0,0,0,0])
    }

    while (i<2){
    randomCellGenerator();
    // console.log(num + ' num');
    // document.getElementById(`cell${num}`).textContent = 2;
    // document.getElementById(`cell${num}`).style.backgroundColor = mapColors[2] ; //mapColor[2]
    i++ }

}
//randomGen doesn't return anything and should call render inside of it.

function randomCellGenerator() {
    let rndRow, rndCol, val;
    val = 2;
    do {
        rndRow = Math.floor(Math.random() * 4 );
        rndCol = Math.floor(Math.random() * 4 );
    }
    while ( !!board[rndRow][rndCol] );

    board[rndRow][rndCol] = val;
    render();
    // return getBoardCell(rndRow, rndCol);
}


//algorthm for which cell to update in DOM based on row and column indices
function getBoardCell(row,col){
    return row * 4 + col;
}

function updateBoard(e){
    switch (e.keyCode) {
        case 37: 
            console.log('leftFunc')
            slideL(board);
            combineR(board);
            slideL(board);
            break;
        case 38: 
            console.log('upFunc')
            break;
        case 39: 
            console.log('rightFunc')
            slide(board);
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
        for (let i = 0; i< row.length; i++){
            let num = getBoardCell(board.indexOf(row),i);
            document.getElementById(`cell${num}`).textContent = row[i];
            document.getElementById(`cell${num}`).style.backgroundColor = mapColors[row[i]];
        }
    });
}

/* slide right */
function slide(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var z = 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( z<zeroes){
                newA.unshift(0); ///cb function here
                z++;
            }
        arr[i] = newA;
    }
    combine(board);
    randomCellGenerator();
    console.table(board)

    render();
}

/* slife left */
function slideL(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var z = 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( z<zeroes){
                newA.push(0); ///cb function here
                z++;
            }
        arr[i] = newA;
    }
    combine(board);
    randomCellGenerator();
    console.table(board)
    render();
}

function combineR(arr) {
    for (let i = 0; i<4; i++){
    
      for (let j=3; j>=0;j--) {
         if (board[i][j] === board[i][j-1]){
           console.log(`at loop j${j} board is ${board}`);
          board[i][j] *=2;
          board[i][j-1] = 0;
        }
      }
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







// ******** Trying to refactor and make two callback functions for slide higher order function ********* //

// var push = (arr,num = 0) => arr.push(num);
// var unshift = (arr, num = 0) => arr.unshift(0);
/* ------------------ */



/* SLIDE RIGHT */
/* function slide(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var z = 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( z<zeroes){
                newA.push(0); ///cb function here
                z++;
            }
        arr[i] = newA;
    }
} */


//slide,combine,slide Left push
// board = [[0,0,0,0],[0,0,0,0]];

// board[0] = newA.arr

function combine(arr) {
   
for (let i = 0; i<4; i++){
    for (let j=i+1; j<4;j++) {
        if (board[i] === board[j] && !!board[i] && !!board[j]){
            console.log(j)
       console.log(`at loop j${j} board is ${board}`)
      let add = board[j] + board[j];
      board[i] = add;
      board[j] = 0;
    }
  }
}
}
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

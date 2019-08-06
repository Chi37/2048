/*----- constants -----*/

const winningScore = 2048;


const mapColors =  {
    0:'thistle',
    2: '#e1deff',
    4: '#c4bdff',
    8: '#6d5cff',
    16:'#4e3fd1',
    32:'#342a8c',
    64:'#ff7f5c',
    128: '#ff997c',
    256: '#ffbfad',
    512: '#ff5b2e',
    1024: 'redorange',
    2048: 'goldenrod',

};

 /*----- app's state (variables) -----*/ 
 let score, board, randomTwoTile, num, gameEnd

    board = [];
    score;


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
    score = 0;
    let i = 0;
   
    for (let i=0; i<4; i++){
        board.push([0,0,0,0])
    }

    while (i<2){
    randomCellGenerator();
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
    render();
}

//algorthm for which cell to update in DOM based on row and column indices
function getBoardCell(row,col){
    return row * 4 + col;
}

function updateBoard(e){
    switch (e.keyCode) {
        case 37: 
            slideL(board);
            combineR(board);
            slideL(board);
            randomCellGenerator();
            break;
        case 38: //up
            rotate(board);
            slide(board);
            rotate(board);rotate(board);rotate(board);
            combine(board);
            break;
        case 39: 
            console.log('rightFunc')
            slide(board);
            combineR(board);
            slide(board);
            randomCellGenerator();
            break;
        case 40: 
            console.log('downFunc')
            rotate(board);
            slideL(board);
            rotate(board);rotate(board);rotate(board);
            combineR(board);
            break;
        default:
            break;
    }
}

function render(){
    // randomCellGenerator();
    board.forEach(row => {
        for (let i = 0; i< row.length; i++){
            let num = getBoardCell(board.indexOf(row),i);
            document.getElementById(`cell${num}`).textContent = row[i];
            document.getElementById(`cell${num}`).style.backgroundColor = mapColors[row[i]];
        }
    });
    document.querySelector('h3').textContent = `Score: ${score}`;
}

/** TODO: refactor slide code below to maybe HOH function with callback */

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
    render();
}


/* slide left */
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
    render();
}

function combineR(arr) {
    for (let i = 0; i<4; i++){
    
      for (let j=3; j>=0;j--) {
         if (board[i][j] === board[i][j-1]){
        //    console.log(`at loop j${j} board is ${board}`);
          let add = board[i][j] *=2;
          board[i][j-1] = 0;
          score += add;
        }
      }
      }
      render();
    //   return canMove(board);
    }
    
function combine() {
    for (let i = 0; i<4; i++){
        for (let j=i+1; j<4;j++) {
            if (board[i] === board[j] && !!board[i] && !!board[j]){
                let add = board[j] + board[j];
                board[i] = add;
                board[j] = 0;
                score += add;
            }
        }
    }
    
    render();
    if (checkEndGame()) return;
}



function rotate(board) {
    let n = board.length;
    let x = Math.floor(n/ 2);
    let y = n - 1; //highest index 
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          k = board[i][j];
          board[i][j] = board[y - j][i];
          board[y - j][i] = board[y - i][y - j];
          board[y - i][y - j] = board[j][y - i]
          board[j][y - i] = k
       }
    }
  }

  function reverse(){
      board.forEach(row=>{
          row.reverse();
      });
      render();
  }


/** CHECKER NOT WORKING FOR STOPPING RANDOMECELLGEN FROM INVOKIG WHEN YOU AREN'T ALLOWED TO MOVE ONE DIRECTION OR NOT */

// function canMove (arr){
//     let c = 0;
//     arr.forEach(row => { 
//         if ((!!row[3] && !!row[2] && !!row[1] && !!row[0]) ||// 1111
//             (!row[3] && !row[2] && !!row[1] && !!row[0]) || //0011
//             (!row[3] && !row[2] && !row[1] && !!row[0])  //0001
//         || (!row[3] && !!row[2] && !!row[1] && !!row[0])) {c++} //0111
//         }) 
//     return c;
//     }
    



/** TODO: ADD SCORES LOGICE */
//CALCULATE SCORES - loop through the array and add the digits; and set score to that
//add that score in DOM to display






// ********  Trying to refactor and make two callback functions for slide higher order function ********* //

// var push = (arr,num = 0) => arr.push(num);
// var unshift = (arr, num = 0) => arr.unshift(0);
/* ------------------ */



//check end of game after combine
function checkEndGame(){
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j< board[0].length; j++){
            gameEnd = !board[i][j]? false :true;
           
        };
    }
    return gameEnd;
};


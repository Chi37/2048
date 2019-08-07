/*----- constants -----*/

const winningScore = 2048;

const mapColors =  {
    null:'thistle',
    2: '#e1deff',
    4: '#c4bdff',
    8: '#6d5cff',
    16:'#4e3fd1',
    32:'#342a8c',
    64:'#33c0ff',
    128: '#2b24f8',
    256: '#ffbfad',
    512: '#ff5b2e',
    1024: 'violetblue',
    2048: 'goldenrod',
};

 /*----- app's state (variables) -----*/ 
 let score, board, num, gameEnd 

    board = [];
    score;


/*----- cached element references -----*/

//cache board arrays to look up the individual cells later and check if it is 0 ?
let cell = document.querySelectorAll('el') 
//  var idx = parseInt(evt.target.id.replace('sq', ''));

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
        board.push([null,null,null,null])
    }

    while (i<2){
    randomCellGenerator();
    i++ }

}

//generate a random two on a tile that is null
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
        case 37: //left 
           executeLeftArrow();
            break;
        case 38: //up
            executeUpArrow();
            break;
        case 39: //right
            executeRightArrow();
            break;
        case 40: //down
            executeDownArrow();
            break;
        default:
            break;
    }
}

function render(){
    board.forEach(row => {
        for (let i = 0; i< row.length; i++){
            let num = getBoardCell(board.indexOf(row),i);
            document.getElementById(`cell${num}`).textContent = row[i];
            document.getElementById(`cell${num}`).style.backgroundColor = mapColors[row[i]];
        }
    });
    document.querySelector('h3').textContent = `Score: ${score}`;
}

//R,L,U,D methods
function executeRightArrow(){
    canMove = canMoveRightOrUp();
    if(!canMove){return};
    slide(board);
    combineR(board);
    slide(board);
    randomCellGenerator();
    render();

}

 function executeLeftArrow(){
 
    canMove = canMoveLeftOrDown();
    if(!canMove){return};
    slideL(board);
    combine();
    slideL(board);
    randomCellGenerator();
    render();
}

 function executeUpArrow(){

    rotate(board);
    canMove = canMoveRightOrUp();
    if(!canMove){
        rotate(board);rotate(board);rotate(board);
        return;
        };
    slide(board);
    combineR(board);
    slide(board);
    rotate(board);rotate(board);rotate(board);
    randomCellGenerator();
}

 function executeDownArrow(){  

     rotate(board);
     console.table(board)
     canMove = canMoveLeftOrDown();
     if(!canMove){
         rotate(board);rotate(board);rotate(board);
         return;
        }
     slideL(board);
     combine(board);
     slideL(board);
     rotate(board);rotate(board);rotate(board);
     randomCellGenerator();
}

function checkEndGame() {
    //if each row does not return null and canMove functions are false
}



/** TODO: refactor slide code below to maybe HOH function with callback */

function slide(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var counter = 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( counter <zeroes){
                newA.unshift(null); ///cb function here
                counter++;
            }
        arr[i] = newA;
    }
    // render();
}


/* slide left */
function slideL(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var counter= 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( counter <zeroes){
                newA.push(null); ///cb function here
                counter++;
            }
        arr[i] = newA;
    }
    // render();
}

function combineR() {
    for (let i = 0; i<4; i++){
      for (let j=3; j>=0;j--) {
        if (board[i][j] === board[i][j-1]){
            let add = board[i][j] *=2;
            board[i][j-1] = 0;
            score += add;
            }
        }
    }
    // render();
}
    
function combine() {
    for (let i = 0; i<4; i++){
        for (let j=0; j<4;j++) {
            if (board[i][j] === board[i][j+1] && !!board[i] && !!board[j]){
                let add = board[i][j] *=2;
                board[i][j+1] =0;
                score += add;
            }
        }
    }
    
    // render();
};



function rotate(board) {
    let n = board.length;
    let x = Math.floor(n/ 2); //loop depending on size of matrix
    let y = n - 1; //highest index 
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          k = board[i][j]; //tmp value to hold first value
          board[i][j] = board[y - j][i];
          board[y - j][i] = board[y - i][y - j];
          board[y - i][y - j] = board[j][y - i]
          board[j][y - i] = k
       }
    }
    render();
  }




/** TODO: CanMove CHECKER */

// ********  Trying to refactor and make two callback functions for slide higher order function ********* //
    // var push = (arr,num = 0) => arr.push(num);
    // var unshift = (arr, num = 0) => arr.unshift(0);
/* ------------------ */


//check end of game after combine
function checkEndGame(){
    let canMoveLD, canMoveRU
    canMoveLD = canMoveLeftOrDown();
    canMoveRU = canMoveRightOrUp();
    if((!canMoveLD) && (!canMoveRU) ) {
        alert('No more Moves')
    }
    // for (let i = 0; i < board.length; i++){
    //     for (let j = 0; j< board[0].length; j++){
    //         gameEnd = !board[i][j] ? false : true;
           
    //     };
    };
 



  
 function canMoveLeftOrDown (){
    let canMove = board.some(row => {
        // check if two adjacent non-zero values
        if (row.some((val, idx) => val && val === row[idx + 1])) return true;
        // check if zero is good
        let sawNum = false;
        for (let i = 3; i > 0; i--) {
          if (row[i]) {
            sawNum = true;
          } else if (sawNum) {
            return true;
          }
        }
        return false;
      });
      return canMove;
 }

function canMoveRightOrUp (){
let canMove = board.some(row => {
    // check if two adjacent non-zero values
    if (row.some((val, idx) => val && val === row[idx + 1])) return true;
    // check if null is good
    let sawNum = false;
    return row.some(val => {
      if (val) {
        sawNum = true;
        return false;
      } else if (sawNum) {
        return true;
      } else {
        return false;
      }
    });
  });
  return canMove;
}
  
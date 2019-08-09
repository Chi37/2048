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
    512: '#ff6666',
    1024: '#cc00cc',
    2048: '#cc0052',
};

 /*----- app's state (variables) -----*/ 
 let score, board, num, gameEnd 

    board = [];
    score;

/*----- cached element references -----*/


/*----- event listeners -----*/ 
document.addEventListener('keydown', updateBoard);

/*----- functions -----*/
init();

function init() {
    score = 0;
    let i = 0;
    gameEnd = false;
   
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
    if (gameEnd){return}
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

    if (checkPlayerLose()){
        document.querySelector('h3').textContent = `GAME OVER!
        Your Score is: ${score}`;
        document.querySelector('h3').style.color = '#DC143C'
    } else if(playerWins()){
        console.log('render')
        document.querySelector('h3').textContent = `YOU WINNN!
        Your Score is: ${score}`;
        document.querySelector('h3').style.color = '#00BFFF'
    }
}
//R,L,U,D methods
function executeRightArrow(){
    canMove = canMoveRightOrUp(board);
    if(!canMove){return};
    slide(board);
    combineR(board);
    slide(board);
    randomCellGenerator();
    render();

}

 function executeLeftArrow(){
 
    canMove = canMoveLeftOrDown(board);
    if(!canMove) return;
    slideL(board);
    combine();
    slideL(board);
    randomCellGenerator();
    render();
}

 function executeUpArrow(){

    rotate(board);
    canMove = canMoveRightOrUp(board);
    if(!canMove){
        rotate(board);rotate(board);rotate(board);
        render();
        return;
        };
    slide(board);
    combineR(board);
    slide(board);
    rotate(board);rotate(board);rotate(board);
    randomCellGenerator();
    render();
}

 function executeDownArrow(){  

     rotate(board);
     canMoveL = canMoveLeftOrDown(board);
     if(!canMoveL){
         rotate(board);rotate(board);rotate(board);
         render();
         return;
        }
     slideL(board);
     combine(board);
     slideL(board);
     rotate(board);rotate(board);rotate(board);
     randomCellGenerator();
     render();
}


function slide(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var counter = 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( counter <zeroes){
                newA.unshift(null); 
                counter++;
            }
        arr[i] = newA;
    }
}


/* slide left */
function slideL(arr){
    for (let i = 0; i<board.length; i++){
        let zeroes = 0;
        var counter= 0;
        newA = arr[i].filter(val => val);
        zeroes = arr.length - newA.length;
            while( counter <zeroes){
                newA.push(null); 
                counter++;
            }
        arr[i] = newA;
    }
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
};



function rotate(board) {
    let n = board.length;
    let x = Math.floor(n/ 2); //loop depending on size of matrix
    let y = n - 1; //highest index 
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          k = board[i][j]; //tmp var to hold first value
          board[i][j] = board[y - j][i];
          board[y - j][i] = board[y - i][y - j];
          board[y - i][y - j] = board[j][y - i]
          board[j][y - i] = k
       }
    }
  }

 function canMoveLeftOrDown (board){

    let canMoveL = board.some(row => {
        // check if two adjacent non-zero values
        if (row.some((val, idx) => val && val === row[idx + 1])) return true;
        // check if zero is good
        let sawNum = false;
        for (let i = 3; i > 0; i--) {
           if(!row[0]) return true; 
          if (row[i]) {
            sawNum = true;
          } else if (sawNum) {
            return true;
          }
        }
        return false;
      });
      return canMoveL;
 }

function canMoveRightOrUp (board){
let canMoveR = board.some(row => {
    // check if two adjacent non-zero values
  
    if (row.some((val, idx) => val && val === row[idx + 1])){return true} ;
    // didn't see any truthy vales, so sawNum false
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
    return canMoveR;
}


// check end of game after combine
function checkPlayerLose(){
    var copyArr = [];
    board.forEach(function(each){
        copyArr.push(each);
    })

    //check up and down, so rotate first
    rotate(copyArr);
    canMoveD = canMoveLeftOrDown(copyArr);
    canMoveU = canMoveRightOrUp(copyArr);

    //check left and right so rotate back
    rotate(copyArr);rotate(copyArr);rotate(copyArr);
    canMoveL = canMoveLeftOrDown(copyArr);
    canMoveR = canMoveRightOrUp(copyArr);

    if((!canMoveL) && (!canMoveR) && (!canMoveU) && (!canMoveD)) {
        gameEnd = true;
        return gameEnd;
    };    
};



function playerWins(){
    board.forEach(function(row){
        if(row.includes(2048)){
            gameEnd = true;
        };
    });
    return gameEnd;
}




/** SOME TESTING */
function gameLoseBoard() {
board = [
    [1,4,3,4],
   [16,1,2,1],
   [2,4,16,4],
   [16,2,4,8]
  ];
  render();
}

function gameLoseBoardTest() {
    board = [
        [2,32,3,4],
       [16,8,2,16],
       [2,4,16,4],
       [16,2,4,8]
      ];
      render();
    }

function gameWinBoardTest() { 
    board = [
        [512,0,3,4],
        [16,1,2048,1],
        [2,4,16,4],
        [16,2,1024,8]
        ];
        render();
    }
    
function TestLeft() {
    board = [
        [null,null,null,null],
        [null,2,32,8],
        [null,16,128,16],
        [null,2,4,8]
      ];
}

function cantMoveLeft(){
    board = [
        [8,2,null,null],
        [4,2,32,8],
        [16,128,16,null],
        [2,4,8,null]
      ];
    render();
}
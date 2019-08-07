/*----- constants -----*/

const winningScore = 2048;


const mapColors =  {
    null:'thistle',
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
            slideL(board);
            combine();
            slideL(board);
            randomCellGenerator();
            break;
        case 38: //up
            rotate(board);
            slide(board);
            combineR(board);
            slide(board);
            rotate(board);rotate(board);rotate(board);
            break;
        case 39: //right
            slide(board);
            combineR(board);
            slide(board);
            randomCellGenerator();
            break;
        case 40: //down
            rotate(board);
            slideL(board);
            combine(board);
            slideL(board);
            rotate(board);rotate(board);rotate(board);
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

/* slide right  filter truthy values and find out how many 0's are in arr*/
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
    render();
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
    render();
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
      render();
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
    
    render();
};



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
    render();
  }

  function reverse(){
      board.forEach(row=>{
          row.reverse();
      });
      render();
  }


/** TODO: CanMove CHECKER */

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





/** 
 * 
 * let rowAdj = board[0].some((el, idx) => {
    return el === board[idx + 1];
    });

 */

let rowAdj = 
    board.forEach(row => {
        row.some((el, idx) => {
        if(row[idx+1] === 0){ return true }
        return el === row[idx + 1];
        });
    });




// TODO: DOWN FUNCTION ISN'T PLACING NUM CORRECTLY
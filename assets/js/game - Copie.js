

document.addEventListener("DOMContentLoaded", () => {
    const start_btn = document.getElementById("start-btn");
    start_btn.addEventListener("click", startGame);
    
const grid = document.getElementById("canvas");
const grid_style = getComputedStyle(grid);




const size_grid=10;
const width = parseInt(grid_style.width)/size_grid;
const height = parseInt(grid_style.height)/size_grid;
let cells;


let snakeColor = 'hsl(50, 100%, 50%)';

let direction = 'right';



function startGame(){
    console.log("game start");
    gameGrid();
    initSnake();
    update();

    

}
let board;
const gridElement = {
    0: 'grass',
    1: 'fruit',
    2: 'head',
    3: 'body',
    4: 'wall',
  };
function gameGrid(){
    board =new Array(size_grid);
    for (let i = 0; i < size_grid ; i++) {
        board[i]=new Array(size_grid);
        for(let j=0;j<size_grid;j++){
            board[i][j]=0;
        }
    }
    console.log("make grid");
    console.log(gridElement[0]);

    renderBoard();

}
function renderBoard() {
    grid.innerHTML = '';
    board.map((row, x) => {
        row.map((currElement, y) => {
            //console.log(`Element at (x: ${x}, y: ${y}) = ${currElement}`);
            grid.innerHTML += `<span class="${gridElement[currElement]}"></span>`;
        });
    });
}

let currentSnake = [0, 1];
function initSnake() {
    currentSnake.forEach(index => {
        if (index === currentSnake[currentSnake.length-1]) {
            board[Math.floor(index / size_grid)][index % size_grid] = 2;
        } else {
            board[Math.floor(index / size_grid)][index % size_grid] = 3;
        }
        
    });

    console.log(gridElement.HEAD)
    console.log(board)
    renderBoard();
}





function update() {
    setInterval(() => {
        move(); 
    }, 100); 
}
function move(){
    console.log(direction);
    let head = currentSnake[0];
    let newHead;
    switch (direction) {
        case "right":
            newHead = head + 1;
            if (newHead % size_grid === 0) newHead -= size_grid; 
            break;
        case "left":
            newHead = head - 1;
            if (newHead % size_grid === 0) newHead += size_grid; 
            break;
        case "up":
            newHead = head - size_grid;
            if (newHead < 0) newHead = size_grid * (size_grid - 1)+newHead;
            break;
        case "down":
            newHead = head + size_grid;
            if (newHead >= size_grid * size_grid)newHead = newHead%size_grid;
            break;
    }
    currentSnake.unshift(newHead); 
    currentSnake.pop();
    console.log(currentSnake);
    board = new Array(size_grid).fill(0).map(() => new Array(size_grid).fill(0));
    currentSnake.forEach((index, idx) => {
        if (idx === 0) {
            board[Math.floor(index / size_grid)][index % size_grid] = 2;
        } else {
            board[Math.floor(index / size_grid)][index % size_grid] = 3;
        }
    });
    renderBoard();
}
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
    }
});



});



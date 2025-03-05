document.addEventListener("DOMContentLoaded", () => {
    let start_screen=document.getElementById("start-screen");
    start_screen.style.display="flex";    
    let gameover_screen=document.getElementById("gameover-screen");
    gameover_screen.style.display="none"; 

    let start_btn= document.getElementById("play-btn");
    start_btn.addEventListener("click",startAnimation);
    let retry_btn= document.getElementById("retry-btn");
    retry_btn.addEventListener("click",resetGame);

    let dpad = document.getElementById("dpad");
    if (window.innerWidth > 800) {
        dpad.style.display = "none";
    } else {
        dpad.style.display = localStorage.getItem("mobile_mode") === "true" ? "flex" : "none";
    }


    




    var eatAppleSound = new Audio('assets/sound/apple-crunch-215258.mp3');
    var hitWallSound = new Audio('assets/sound/hit-rock-02-266304.mp3');
    eatAppleSound.volume=localStorage.getItem("volumeControl");
    hitWallSound.volume=localStorage.getItem("volumeControl")

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var raf;
    var direction = "right";
    var grid_size =20;
    var gridStep = canvas.width / grid_size;
    
    var border_enable = localStorage.getItem('enable_border') === "true" ? true : false;
    
    var lastTime = 0; 
    var interval = 100;

    var gameOver=false;
    
    
    const stage1=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    const stage2=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    const stage3=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    const stage4=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    const stage=[[stage1,stage2,stage3,stage4],
                ["Stage 1","Stage 2","Stage 3","Stage 4"]];
    let stageName=document.getElementById("stagename");
    let currentStageIndex =0;
    stageName.textContent = stage[1][currentStageIndex];
    var currentStage=adapteStage(stage[0][currentStageIndex]);

    var score=0;
    let highscore = JSON.parse(localStorage.getItem('highscore') || '[0, 0, 0, 0]');
    document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore[currentStageIndex];

    document.getElementById("decrease").addEventListener("click", () => {
        if (currentStageIndex > 0) {
            cancelAnimationFrame(raf);
            raf=null;
            snake.reset();
            start_screen.style.display="flex";
            gameover_screen.style.direction="none";
            currentStageIndex--;    
            stageName.textContent = stage[1][currentStageIndex];
            document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore[currentStageIndex];
            currentStage=adapteStage(stage[0][currentStageIndex]);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wall.draw();
        }
    });
    
    document.getElementById("increase").addEventListener("click", () => {
        if (currentStageIndex < stage[1].length - 1) {
            cancelAnimationFrame(raf);
            raf=null;
            snake.reset();
            start_screen.style.display="flex";
            gameover_screen.style.direction="none";
            currentStageIndex++; 
            stageName.textContent = stage[1][currentStageIndex];
            document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore[currentStageIndex];
            currentStage=adapteStage(stage[0][currentStageIndex]);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wall.draw();
        }
    });




    
    console.log(stage2.reverse())
    function adapteStage(stage){
        let output=[];
        for(let i=0;i<stage.length;i++){
            let row=[];            
            for(let j=0;j<stage[i].length;j++){                
                for(let k=0;k<grid_size/stage.length;k++){
                    row.push(stage[i][j]);
                }
            }
            for(let l=0;l<grid_size/stage.length;l++){
                output.push([...row])
            }     
        }
        return output;
    }
    
    
    console.log(currentStage);
    var wall={
        color: "brown",
        draw: function () {
            for(let i=0;i<currentStage.length;i++){          
                for(let j=0;j<currentStage[i].length;j++){ 
                    if(currentStage[i][j]==1){
                        ctx.beginPath();
                        ctx.rect(j*gridStep, i*gridStep, gridStep, gridStep);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                    }
                }                
            }
        }
    }

    
    var snake = {
        body: [{ x: gridStep / 2, y: gridStep / 2 }],
        Length : 3,
        radius: gridStep/2,
        color: "blue",
        draw: function () {
            for (let i = 0; i < snake.body.length; i++) {
                ctx.beginPath();
 
                ctx.rect(snake.body[i].x-gridStep/2,snake.body[i].y-gridStep/2, gridStep, gridStep);
                
                ctx.fillStyle = this.color;
                ctx.closePath();
                
                ctx.fill();
            }
        },
        reset: function() {
            this.body = [{ x: gridStep / 2, y: gridStep / 2 }];
            this.Length = 3;
        }
    };
    var fruit = {
        x: gridStep*(0.5+Math.floor(Math.random() * grid_size)),
        y: gridStep*(0.5+Math.floor(Math.random() * grid_size)),
        radius: gridStep/2*0.5,
        color: "red",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        random :function () {
            let checkWall = true;
            let gridPosx, gridPosy;
            const snakePositions = new Set(snake.body.map(s => `${s.x},${s.y}`));
            while (checkWall) {
                gridPosx = Math.floor(Math.random() * grid_size);
                gridPosy = Math.floor(Math.random() * grid_size);
                
         
                if (currentStage[gridPosy][gridPosx] === 0 && !snakePositions.has(`${gridPosx * gridStep},${gridPosy * gridStep}`)) {
 
                    this.x = gridPosx * gridStep + gridStep / 2;
                    this.y = gridPosy * gridStep + gridStep / 2;
                    checkWall = false;
                }
            }
        },
        reset: function() {
        }
    };

    function draw(timestamp) {
        if (gameOver) {
            return;
        }
        if (timestamp - lastTime >= interval) {
            lastTime = timestamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wall.draw();
            snake.draw();
            fruit.draw();
            moveSnake();            
            border(); 
            eatFruit();         
        }
        raf = window.requestAnimationFrame(draw);

    }

    function moveSnake() {
        let head =  { x: snake.body[0].x, y: snake.body[0].y };;
        
        if (direction === "right") head.x += gridStep;
        if (direction === "left") head.x -= gridStep;
        if (direction === "up") head.y -= gridStep;
        if (direction === "down") head.y += gridStep;
              
        snake.body.unshift(head);
        
        if (snake.body.length > snake.Length) {
            snake.body.pop();
        }
    }

    function eatFruit(){
        if (snake.body[0].x === fruit.x && snake.body[0].y === fruit.y) {
            eatAppleSound.play();
            eatAppleSound.playbackRate = 2;
            setTimeout(function() {
                eatAppleSound.pause();
                eatAppleSound.currentTime = 0; 
            }, 500); 



            score += 10;
            updateScore();
            fruit.random();
            snake.Length++; 
        }
    }
    function updateScore(){        
        document.getElementById('scoretxt').textContent = 'Score: ' + score;
        console.log(highscore[currentStageIndex])
        if (score > highscore[currentStageIndex]) {
            console.log("New highscore for stage " + (currentStageIndex + 1));
            highscore[currentStageIndex] = score;
            localStorage.setItem('highscore', JSON.stringify(highscore));
            document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore[currentStageIndex];
        }
    }
    
    
    function border(){
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[i].x === snake.body[0].x && snake.body[i].y === snake.body[0].y) {
                hitWallSound.currentTime = 0.3; 
                hitWallSound.play(); 
                cancelAnimationFrame(raf);
                
                gameOver = true;
                gameOverHandler();
            }
        }
        let xIndex = Math.floor(snake.body[0].x / gridStep);
        let yIndex = Math.floor(snake.body[0].y / gridStep);

        if (xIndex >= 0 && xIndex < currentStage[0].length && yIndex >= 0 && yIndex < currentStage.length) {
            if (currentStage[yIndex][xIndex] == 1) {
                hitWallSound.currentTime = 0.3; 
                hitWallSound.play();                
 
                gameOver = true;
                gameOverHandler();
            }
        } else if(border_enable){
            hitWallSound.currentTime = 0.3; 
            hitWallSound.play(); 
            cancelAnimationFrame(raf);
            
            gameOver = true;
            gameOverHandler();
            
        }else{
            
            if (snake.body[0].x < 0) snake.body[0].x = canvas.width - gridStep/2;
            if (snake.body[0].x >= canvas.width) snake.body[0].x = gridStep/2;
            if (snake.body[0].y < 0) snake.body[0].y = canvas.height - gridStep/2;
            if (snake.body[0].y >= canvas.height) snake.body[0].y = gridStep/2;
        }        


 
    }
    
    document.getElementById("right").addEventListener("click", () => {
        if (direction !== "left") { 
            direction = "right";
        }
    });
    
    document.getElementById("left").addEventListener("click", () => {
        if (direction !== "right") {
            direction = "left";
        }
    });
    
    document.getElementById("up").addEventListener("click", () => {
        if (direction !== "down") {
            direction = "up";
        }
    });
    
    document.getElementById("down").addEventListener("click", () => {
        if (direction !== "up") {
            direction = "down";
        }
    });


    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
                if (direction !== "left") { 
                    direction = "right";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down";
                }
                break;
        }
    });

    function startAnimation() {
        currentStage=stage[0][currentStageIndex]
        start_screen.style.display="none";
        console.log("start Animation + raf: "+raf)
        if (gameOver) {
            resetGame();      
          }
        
        if (!raf) {
            console.log("raf")
            raf = window.requestAnimationFrame(draw);
        }
    }
    function gameOverHandler(){
        //cancelAnimationFrame(raf);
        gameover_screen.style.display="flex";
        raf = null;
        //resetGame()
    }

    function resetGame() {
        gameOver = false;
        score = 0;
        document.getElementById('scoretxt').textContent = 'Score: ' + score;
        
        snake.reset();
        fruit.random();
        direction = "right";
        
        if (raf) {
            cancelAnimationFrame(raf);
        }
        raf = null;
        gameover_screen.style.display="none";
        startAnimation(); 
    }


});



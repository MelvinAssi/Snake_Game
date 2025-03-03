document.addEventListener("DOMContentLoaded", () => {
    let start_btn= document.getElementById("start-btn");
    start_btn.addEventListener("click",startAnimation);
    let enable_border=document.getElementById("enable_border");
    enable_border.addEventListener("change", function() {
        border_enable = enable_border.checked;
    });







    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var raf;
    var direction = "right";
    var grid_size =20;
    var gridStep = canvas.width / grid_size;
    var border_enable=enable_border.checked;
    var lastTime = 0; 
    var interval = 100;
    var score=0;
    var highscore=localStorage.getItem('highscore') ?? 0;
    document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore;
    var gameOver=false;
    
    
    const stage1=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    const stage2=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    const stage3=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    

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
    
    var curentStage=adapteStage(stage2);
    console.log(curentStage);
    var wall={
        color: "brown",
        draw: function () {
            for(let i=0;i<curentStage.length;i++){          
                for(let j=0;j<curentStage[i].length;j++){ 
                    if(curentStage[i][j]==1){
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
            console.log(this.x)
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        random:function(){
            let checkWall=true;
            let gridPosx;
            let gridPosy;
            while(checkWall){
                gridPosx=Math.floor(Math.random() * grid_size);
                gridPosy=Math.floor(Math.random() * grid_size);
                if(curentStage[gridPosy][gridPosx]==0){
                    this.x=gridStep*(0.5+gridPosx);
                    this.y=gridStep*(0.5+gridPosy);
                    checkWall=false;
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
            console.log("eat");
            score += 10;
            updateScore();
            fruit.random();
            snake.Length++; 
        }
    }
    function updateScore(){        
        document.getElementById('scoretxt').textContent = 'Score: ' + score;
        if(score>highscore){
            highscore=score;
            localStorage.setItem('highscore', highscore);
            document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore;
        }
    }
    
    function border(){
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[i].x === snake.body[0].x && snake.body[i].y === snake.body[0].y) {
                console.log("gameover");
                cancelAnimationFrame(raf);
                gameOver = true;
            }
        }
        if(border_enable){            
            if (snake.body[0].y >= canvas.height || (snake.body[0].y <= 0 )||snake.body[0].x>= canvas.width || snake.body[0].x  <= 0) {
                console.log("gameover")
                cancelAnimationFrame(raf)
                gameOver=true;                
            }
        }else{
            if (snake.body[0].x < 0) snake.body[0].x = canvas.width - gridStep/2;
            if (snake.body[0].x >= canvas.width) snake.body[0].x = gridStep/2;
            if (snake.body[0].y < 0) snake.body[0].y = canvas.height - gridStep/2;
            if (snake.body[0].y >= canvas.height) snake.body[0].y = gridStep/2;
        }  
    }


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
        if (gameOver) {
            resetGame();        }
        
        if (!raf) {
            raf = window.requestAnimationFrame(draw);
        }
    }

    function resetGame() {
        gameOver = false;
        snake.reset();
        fruit.random(); 
        direction = "right";
        score=0;
        document.getElementById('scoretxt').textContent = 'Score: ' + score;
        raf = null;
    }
    snake.draw();
    //fruit.draw();
    wall.draw();


});



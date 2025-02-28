





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
    var highscore=localStorage.getItem('highscore') ?? 0;//if (highscore == null) highscore = 0;
    document.getElementById('highscoretxt').textContent = 'Highscore: ' + highscore;
    var gameOver=false; 


    var ball = {
        x: gridStep/2,
        y: gridStep/2,
        vx: gridStep,
        vy: 0,
        radius: gridStep/2,
        color: "blue",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        reset: function() {
            this.x = gridStep/2;
            this.y = gridStep/2;
            this.vx = gridStep;
            this.vy = 0;
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
            this.x=gridStep*(0.5+Math.floor(Math.random() * grid_size));
            this.y=gridStep*(0.5+Math.floor(Math.random() * grid_size));
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
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ball.draw();
            fruit.draw();
            ball.x += ball.vx;
            ball.y += ball.vy;
            eatFruit()
            border();          
        }
        raf = window.requestAnimationFrame(draw);
    }
    function eatFruit(){
        if(ball.x==fruit.x && ball.y==fruit.y){
            console.log("eat")
            score+=10;
            updateScore();            
            fruit.random(); 
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
        if(border_enable){
            if (ball.y+ball.radius > canvas.height || (ball.y  <= 0 )||ball.x+ball.radius > canvas.width || ball.x  <= 0) {
                console.log("gameover")
                cancelAnimationFrame(raf)
                gameOver=true;                
            }
        }else{
            if (ball.y  +ball.radius > canvas.height)ball.y=ball.radius;
            else if(ball.y <= 0)ball.y=canvas.height-ball.radius;
            else if (ball.x+ball.radius > canvas.width )ball.x=ball.radius;
            else if( ball.x <= 0)ball.x=canvas.width-ball.radius;
        }  
    }


    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
                if (direction !== "left") { 
                    ball.vx = gridStep;
                    ball.vy = 0;
                    direction = "right";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    ball.vx = -gridStep;
                    ball.vy = 0;
                    direction = "left";
                }
                break;
            case "ArrowUp":
                if (direction !== "down") {
                    ball.vx = 0;
                    ball.vy = -gridStep;
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    ball.vx = 0;
                    ball.vy = gridStep;
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
        ball.reset();
        fruit.random(); 
        direction = "right";
        score=0;
        document.getElementById('scoretxt').textContent = 'Score: ' + score;
        raf = null;
    }
    ball.draw();
    fruit.draw();


});



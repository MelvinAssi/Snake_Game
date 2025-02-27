





document.addEventListener("DOMContentLoaded", () => {
    let start_btn= document.getElementById("start-btn");
    start_btn.addEventListener("click",startAnimation);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var raf;
    var direction = "right";
    var grid_size =20;
    var border_enable=true;
    var lastTime = 0; 
    var interval = 100;
    var gameOver=false; 


    var ball = {
        x: canvas.width/(2*grid_size),
        y: canvas.width/(2*grid_size),
        vx: canvas.width/(grid_size),
        vy: 0,
        radius: canvas.width/(2*grid_size),
        color: "blue",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        reset: function() {
            this.x = canvas.width / (2 * grid_size);
            this.y = canvas.height / (2 * grid_size);
            this.vx = canvas.width / grid_size;
            this.vy = 0;
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
            ball.x += ball.vx;
            ball.y += ball.vy;
            border();
          
        }
        raf = window.requestAnimationFrame(draw);
    }
    
    function border(){
        console.log(ball.x);
        if(border_enable){
            if (ball.y  +ball.radius > canvas.height || ball.y  <= 0) {
                console.log("gameover")
                ball.vx = 0;
                ball.vy = 0;
                cancelAnimationFrame(raf)
                gameOver=true;
                
            }
            if (ball.x+ball.radius > canvas.width || ball.x  <= 0) {
                console.log("gameover")
                ball.vx = 0;
                ball.vy = 0;
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
                    ball.vx = ball.radius*2;
                    ball.vy = 0;
                    direction = "right";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    ball.vx = -ball.radius*2;
                    ball.vy = 0;
                    direction = "left";
                }
                break;
            case "ArrowUp":
                if (direction !== "down") {
                    ball.vx = 0;
                    ball.vy = -ball.radius*2;
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    ball.vx = 0;
                    ball.vy = ball.radius*2;
                    direction = "down";
                }
                break;
        }
    });

    function startAnimation() {
        if (gameOver) {
            resetGame();
        }
        
        if (!raf) {
            raf = window.requestAnimationFrame(draw);
        }
    }

    function resetGame() {
        gameOver = false;
        ball.reset();
        direction = "right";
        raf = null;
    }
    ball.draw();



});



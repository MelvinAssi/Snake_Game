

document.addEventListener("DOMContentLoaded", () => {
    let start_btn= document.getElementById("start-btn");
    start_btn.addEventListener("click",startAnimation);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var raf;
    var direction = "right";
    var lastTime = 0; 
    var interval = 50; 


    var ball = {
        x: 100,
        y: 100,
        vx: 25,
        vy: 0,
        radius: 25,
        color: "blue",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
    };
    function draw(timestamp) {
        if (timestamp - lastTime >= interval) {
            lastTime = timestamp;
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ball.draw();
            ball.x += ball.vx;
            ball.y += ball.vy;
            if (ball.y  +ball.radius > canvas.height || ball.y -ball.radius <= 0) {
                ball.vy = -ball.vy;
            }
            if (ball.x+ball.radius > canvas.width || ball.x -ball.radius <= 0) {
                ball.vx = -ball.vx ;
            }            
        }
        raf = window.requestAnimationFrame(draw);
    }
      


    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
                if (direction !== "left") { 
                    ball.vx = 25;
                    ball.vy = 0;
                    direction = "right";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    ball.vx = -25;
                    ball.vy = 0;
                    direction = "left";
                }
                break;
            case "ArrowUp":
                if (direction !== "down") {
                    ball.vx = 0;
                    ball.vy = -25;
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    ball.vx = 0;
                    ball.vy = 25;
                    direction = "down";
                }
                break;
        }
    });
    function startAnimation() {
        if (!raf) { 
            raf = window.requestAnimationFrame(draw);
        }
    }

    ball.draw();



});



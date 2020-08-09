var ballsNumber = 5
var initialized = false;
var pause = true;
var balls = []
initialize()

setInterval(() => { 
    if(!pause){
        advance()
    } }, 50);

const generateBalls = () => {
    for(i=0;i<ballsNumber;i++){
        balls.push(new Ball())
    }
}
const advance = () => {
    redraw(balls)
    balls.forEach(ball => ball.move(balls))
}
const start = () => {
    pause = !pause
    if(!initialized){
        generateBalls()
        initialized = true 
    }
    document.getElementById("start").innerHTML = pause? "Continue" : "Pause"
}


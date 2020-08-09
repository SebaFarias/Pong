var ballsNumber = 5
var balls = []
var view = new View()
var initialized = false;
var pause = true;
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
    view.redraw(balls)
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


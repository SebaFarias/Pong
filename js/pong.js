const balls = [new ball(),new ball(),new ball(),new ball(),new ball()]
var pause = true;
setInterval(() => { 
    if(!pause){
        advance()
    } }, 50);


//View Components

function redraw(balls) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,tableWidth,tableHeight);
    balls.forEach(ball => {
        var ballXRadius = normalizeBallLooks(Math.floor(ball.posX*tableWidth/100), ball.radius , tableWidth)
        var ballYRadius = normalizeBallLooks(Math.floor(ball.posY*tableHeight/100) , ball.radius , tableHeight)
        var drawPosX = normalizeBallPos(Math.floor(ball.posX*tableWidth/100) , ballXRadius , tableWidth)
        var drawPosY = normalizeBallPos(Math.floor(ball.posY*tableHeight/100) , ballYRadius , tableHeight)
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(drawPosX, drawPosY, ballXRadius , ballYRadius , 0, 0, 2 * Math.PI);
        ctx.fill();
    });   
}
const normalizeBallLooks = (pos,radius,maxValue) => {
    var result = radius
    if(pos + radius >= maxValue){ result = pos >= maxValue ? 1 : maxValue-pos}
    if(pos - radius <= 0){ result = pos<= 0? 1 : pos}
    return result
}

const normalizeBallPos = (value,radius,maxValue) => {
    var result = value
    if(value+radius >= maxValue){result = maxValue-radius}
    if(value-radius <= 0){result = radius}
    return result
}

const resizeCanvas = () => {
    pongTable.width = window.innerWidth
    pongTable.height = window.innerHeight
    tableWidth = pongTable.getBoundingClientRect().width
    tableHeight = pongTable.getBoundingClientRect().height
    redraw(balls)
     
}

const initialize = () => {
    window.addEventListener('resize',resizeCanvas,false)
    resizeCanvas()
}

var pongTable = document.getElementById("pongTable"),
ctx = pongTable.getContext("2d"),
tableWidth = pongTable.getBoundingClientRect().width,
tableHeight = pongTable.getBoundingClientRect().height
initialize()

const showProps = (newBall) => {
    console.log(`Posición (${newBall.posX},${newBall.posY})`);
    console.log(`Velocidad (${newBall.velX} , ${newBall.velY} )`);
};

const advance = () => {
    redraw(balls)
    balls.forEach(ball => ball.move(balls))
}

const start = () => {
    pause = !pause
    document.getElementById("start").innerHTML = pause? "Continue" : "Pause"
}


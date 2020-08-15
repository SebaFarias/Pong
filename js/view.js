const scoreboard = document.querySelector('.scoreboard')
let primary = 'white'
let background = 'black'
pongTable = document.getElementById("pongTable")
ctx = pongTable.getContext("2d")
courtWidth = pongTable.getBoundingClientRect().width
courtHeight = pongTable.getBoundingClientRect().height

const initialize = () => {
    window.addEventListener('resize',resizeCanvas,false)
    resizeCanvas()
}    
const resizeCanvas = () => {
    pongTable.width = window.innerWidth
    pongTable.height = window.innerHeight
    courtWidth = pongTable.getBoundingClientRect().width
    courtHeight = pongTable.getBoundingClientRect().height
    redraw(balls,paddles)
}
const redraw = (balls , paddles) => {
    ctx.fillStyle = background;
    ctx.fillRect(0,0,courtWidth,courtHeight);
    if(balls.length > 0) balls.forEach(ball => {if(!ball.isScoring){drawBall(ball)}}); 
    if(paddles.length > 0) paddles.forEach(paddle => drawPaddle(paddle)); 
}
//---------------------------------------------------Paddle Drawing
const drawPaddle = (paddle) => {
    drawPosX = normalizePaddlePosX(paddle)
    drawPosY = normalizePaddlePosY(paddle)
    paddleWidth = paddle.thickness * courtWidth/100
    paddleHeight = normalizePaddleLooks(paddle,courtHeight)
    ctx.fillStyle = primary
    ctx.fillRect(drawPosX,drawPosY,paddleWidth,paddleHeight)
}
const normalizePaddlePosX = (paddle) => {
    return Math.round((paddle.posX - (paddle.thickness/2)) * courtWidth / 100)
}
const normalizePaddlePosY = (paddle) => {
    let drawPosY = (paddle.posY - paddle.size) * courtHeight / 100
    return Math.round(drawPosY)
}
const normalizePaddleLooks = (paddle , courtHeight) => {
    return paddle.size * 2 * courtHeight / 100
}
//---------------------------------------------------Ball drawing
const drawBall = (ball) => {    
    let drawPosX = normalizeBallPos(ball.posX, courtWidth)
    let drawPosY = normalizeBallPos(ball.posY, courtHeight)
    let normalizedRadius = normalizeRadius(ball.radius,courtWidth,courtHeight)
    let ballXRadius = normalizeBallLooks(drawPosX, normalizedRadius , courtWidth)
    let ballYRadius = normalizeBallLooks(drawPosY, normalizedRadius , courtHeight) 
    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.ellipse(drawPosX, drawPosY, ballXRadius , ballYRadius , 0, 0, 2 * Math.PI);
    ctx.fill();

}
const normalizeBallPos = (value,maxValue) => {
    let newPos = Math.round(value * maxValue/100)
    if(newPos >= maxValue){newPos = maxValue-1}
    if(newPos <= 0){newPos = 1}
    return newPos
}   
const normalizeRadius = (modelRadius,width,height) =>{
return Math.round(((modelRadius*width/100)+(modelRadius*height/100))/2)
}
const normalizeBallLooks = (pos,radius,maxValue) => {
    let result = radius
    if(pos + radius >= maxValue){result = maxValue-pos}
    if(pos - radius <= 0){ result = pos<= 0? 1 : pos}
    return result
}
const updateScoreboard = () => {
    scoreboard.innerHTML = `${p1Score} - ${p2Score}`
}
const show = (item,visible) => {
    if(visible)item.classList.remove('hidden')
    else item.classList.add('hidden')
}
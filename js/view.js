var primary = 'white'
var background = 'black'
pongTable = document.getElementById("pongTable")
ctx = pongTable.getContext("2d")
tableWidth = pongTable.getBoundingClientRect().width
tableHeight = pongTable.getBoundingClientRect().height

   
const initialize = () => {
    window.addEventListener('resize',resizeCanvas,false)
    resizeCanvas()
}    
const resizeCanvas = () => {
    pongTable.width = window.innerWidth
    pongTable.height = window.innerHeight
    tableWidth = pongTable.getBoundingClientRect().width
    tableHeight = pongTable.getBoundingClientRect().height
    redraw(balls)
    
}
const redraw = (balls) => {
    ctx.fillStyle = background;
    ctx.fillRect(0,0,tableWidth,tableHeight);
    ctx.fillStyle = primary;
    balls.forEach(ball => {
        var drawPosX = normalizeBallPos(ball.posX, tableWidth)
        var drawPosY = normalizeBallPos(ball.posY, tableHeight)
        var normalizedRadius = normalizeRadius(ball.radius,tableWidth,tableHeight)
        var ballXRadius = normalizeBallLooks(drawPosX, normalizedRadius , tableWidth)
        var ballYRadius = normalizeBallLooks(drawPosY, normalizedRadius , tableHeight)       
        ctx.beginPath();
        ctx.ellipse(drawPosX, drawPosY, ballXRadius , ballYRadius , 0, 0, 2 * Math.PI);
        ctx.fill();
    });   
}
const normalizeBallPos = (value,maxValue) => {
    var newPos = Math.round(value * maxValue/100)
    if(newPos >= maxValue){newPos = maxValue-1}
    if(newPos <= 0){newPos = 1}
    return newPos
}   
const normalizeRadius = (modelRadius,width,height) =>{
return Math.round(((modelRadius*width/100)+(modelRadius*height/100))/2)
}
const normalizeBallLooks = (pos,radius,maxValue) => {
    var result = radius
    if(pos + radius >= maxValue){result = maxValue-pos}
    if(pos - radius <= 0){ result = pos<= 0? 1 : pos}
    return result
}
 



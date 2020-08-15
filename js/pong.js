const BALL_RADIUS = 1 ,
PADDLE_STEP = 10,
INTRO_BALLS = 40 ,
PADDLE_SIDE = 5
let ballsNumber = 3,
winningPoints = 10,
p1Score = 0,
p2Score = 0,
p1Mover = 'human',
p2Mover = 'human',
intro = true,
initialized = false,
pause = false,
onMenu = false,
score = [0,0],
balls = [],
paddles = []

document.addEventListener('keydown',(event)=>{handleKeyDown(event)})//Check this: should be just ('keydown',handleKeyDown(event)), rigth?
pongTable.addEventListener('keydown',(event)=>{handleKeyDown(event)})
document.querySelector("#logo").addEventListener('click',()=>{stopIntro()})
document.querySelector("#message").addEventListener('click',()=>{stopIntro()})

initialize()
setTimeout(()=>{//Part of Animated Intro
    if(balls.length<1)generateBalls( INTRO_BALLS , 50 )
    setTimeout(()=>{
        if(intro){document.querySelector("#message").style.display = "block"}
    },1000)
},2000)

setInterval(() => { //Main cycle
    updateScoreboard()
    if(!pause){
        advance()
    } 
}, 50)
const sumScore = (player) => {
    if(player === 'p1') p1Score++
    else p2Score++
}
const handleKeyDown = (event) => {
    let keyName = event.key
    if(keyName == 'Enter' || keyName == 'Escape' || keyName == 'p' || keyName == ' ') {
        if(intro)stopIntro()
        else mainMenu()
    }
    else{console.log(event.key);}
}
const stopIntro = () =>{
    intro=false
    if(balls.length<1)generateBalls( INTRO_BALLS , 50 )
    show(document.querySelector('#logo'),false)
    show(document.querySelector("#message"),false)
    mainMenu();
}
const generateBalls = (quantity,posY) => {  
    for(i=0;i<quantity;i++){
        balls.push(new Ball(i,50,posY,100,100,BALL_RADIUS))
    }
}
const createPaddles = () => {
    paddles = [new Paddle(true,PADDLE_SIDE, p1Mover) , new Paddle(false,PADDLE_SIDE,p2Mover)]
}
const advance = () => {
    redraw(balls,paddles)
    paddles.forEach(paddle => paddle.update(balls))
    balls.forEach(ball => ball.update(balls))
}
const start = () => {
    balls=[]
    generateBalls(ballsNumber,-1)
    checkJustice()
    createPaddles()
    initialized = true
    p1Score = 0
    p2Score = 0     
    show(scoreboard,true)
    setTimeout(() => pause = false , 1000)
}
const checkJustice = () => {
    let leftBallsCount = 0
    balls.forEach(ball => {
        if(ball.velX < 0)leftBallsCount++
    })
    if(leftBallsCount/ballsNumber <= 0.25 || leftBallsCount/ballsNumber >= 0.75){
        balls = []
        generateBalls(ballsNumber,-1)      
    }
    if(leftBallsCount/ballsNumber <= 0.25 || leftBallsCount/ballsNumber >= 0.75)checkJustice()
}
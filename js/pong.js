document.addEventListener('keydown',(event)=>{handleKeyDown(event)})
pongTable.addEventListener('keydown',(event)=>{handleKeyDown(event)})
const BALL_RADIUS = 1
var ballsNumber = 10,
winningPoints,
intro = true,
initialized = false,
pause = false,
onMenu = false,
balls = []
initialize()
setTimeout(()=>{//Part of Animated Intro
    if(balls.length<1)generateBalls(20,50)
    setTimeout(()=>{
        if(intro){document.querySelector("#message").style.display = "block"}
    },1000)
},2000)
setInterval(() => { //Main cycle
    if(!onMenu){
        pongTable.focus()
    }
    if(!pause){
        advance()
    } 
}, 50)

const handleKeyDown = (event) => {
    var keyName = event.key
    if(keyName == 'Enter' || keyName == 'Escape' || keyName == 'p' || keyName == ' ') {
        if(intro)stopIntro()
        else mainMenu()
    }
    else{console.log(event.key);}
}
const stopIntro = () =>{
    intro=false
    if(balls.length<1)generateBalls(30,50)
    document.querySelector('#logo').style.display='none'
    document.querySelector("#message").style.display = "none"
    mainMenu();
}
const generateBalls = (quantity,posY) => {  
    for(i=0;i<quantity;i++){
        balls.push(new Ball(i,-1,posY,100,100,BALL_RADIUS))
    }
}
const advance = () => {
    redraw(balls)
    balls.forEach(ball => ball.update(balls))
}
const start = () => {
        balls=[]
        generateBalls(ballsNumber,-1)
        initialized = true     
}


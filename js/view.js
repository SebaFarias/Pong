class View{
    constructor(){
        this.pongTable = document.getElementById("pongTable")
        this.ctx = this.pongTable.getContext("2d")
        this.tableWidth = this.pongTable.getBoundingClientRect().width
        this.tableHeight = this.pongTable.getBoundingClientRect().height
        this.initialize()
    }   
    initialize(){
        window.addEventListener('resize',this.resizeCanvas,false)
        this.resizeCanvas()
    }    
    resizeCanvas(){
        this.pongTable.width = window.innerWidth
        this.pongTable.height = window.innerHeight
        this.tableWidth = this.pongTable.getBoundingClientRect().width
        this.tableHeight = this.pongTable.getBoundingClientRect().height
        this.redraw(balls)
        
    }
    redraw(balls){
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.tableWidth,this.tableHeight);
        this.ctx.fillStyle = 'white';
        balls.forEach(ball => {
            var ballXRadius = this.normalizeBallLooks(Math.floor(ball.posX*this.tableWidth/100), ball.radius , this.tableWidth)
            var ballYRadius = this.normalizeBallLooks(Math.floor(ball.posY*this.tableHeight/100) , ball.radius , this.tableHeight)
            var drawPosX = this.normalizeBallPos(Math.floor(ball.posX*this.tableWidth/100) , ballXRadius , this.tableWidth)
            var drawPosY = this.normalizeBallPos(Math.floor(ball.posY*this.tableHeight/100) , ballYRadius , this.tableHeight)
            this.ctx.beginPath();
            this.ctx.ellipse(drawPosX, drawPosY, ballXRadius , ballYRadius , 0, 0, 2 * Math.PI);
            this.ctx.fill();
        });   
    }
    normalizeBallLooks(pos,radius,maxValue){
        var result = radius
        if(pos + radius >= maxValue){ result = pos >= maxValue ? 1 : maxValue-pos}
        if(pos - radius <= 0){ result = pos<= 0? 1 : pos}
        return result
    }
    normalizeBallPos(value,radius,maxValue){
        var result = value
        if(value+radius >= maxValue){result = maxValue-radius}
        if(value-radius <= 0){result = radius}
        return result
    }    
}


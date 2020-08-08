const RADIUS = 10;

class ball {
    constructor() {
        this.radius = RADIUS;
        this.posX = 50;
        this.posY = Math.random() * 100;
        this.velX = Math.random() < 0.5 ? Math.random() * 3 : Math.random() * -3;
        this.velY = Math.random() < 0.5 ? Math.random() * 3 : Math.random() * -3;
    }
    moveOnX(value){
        this.posX += value
    }
    moveOnY(value){
        this.posY += value
    }
    addXSpeed(value){
        this.velX += value
    }
    addYSpeed(value){
        this.velY += value
    }   
    isOnMySpace(otherBall){
        var deltaX = otherBall.posX - this.posX
        var deltaY = otherBall.posY - this.posY
        var distance = Math.sqrt((deltaX*deltaX)+(deltaY*deltaY))
        return (distance <= 0.5*RADIUS)
    }
    backOff(otherBall){
        var deltaX = otherBall.posX - this.posX
        var deltaY = otherBall.posY - this.posY
        this.moveOnX(deltaX >=0 ? -0.5 : 0.5)
        if(this.isOnMySpace(otherBall)){this.moveOnY(deltaY >=0 ? -0.5 : 0.5)}
        if(this.isOnMySpace(otherBall)){otherBall.moveOnX(deltaX >=0 ? 0.5 : -0.5)}
        if(this.isOnMySpace(otherBall)){otherBall.moveOnY(deltaY >=0 ? 0.5 : -0.5)}
        if(this.isOnMySpace(otherBall)){this.backOff(otherBall)}
    }
    courtColide() {
        if(this.posX <= 0){this.velX = Math.sqrt(this.velX*this.velX)}
        if(this.posX >= 100){this.velX = Math.sqrt(this.velX*this.velX) * -1}
        if(this.posY <= 0){this.velY = Math.sqrt(this.velY*this.velY)} 
        if(this.posY >= 100){this.velY = Math.sqrt(this.velY*this.velY) * -1}
    }
    otherBallsColide(balls) {
        balls.forEach(ball => {
            if( !Object.is(ball,this) && this.isOnMySpace(ball)){ 
                var deltaVX = ball.velX - this.velX
                var deltaVY = ball.velY - this.velY
                this.addXSpeed(deltaVX)
                this.addYSpeed(deltaVY)
                ball.addXSpeed(deltaVX*-1)
                ball.addYSpeed(deltaVY*-1)
                this.backOff(ball)       
            }
        });
    }
    move(balls) {
        this.courtColide()
        this.otherBallsColide(balls)
        this.posX = this.posX + this.velX
        this.posY = this.posY + this.velY
    }
}

const RADIUS = 10;
class Ball {
    constructor() {        
        this.radius = RADIUS;
        this.posX = 50;
        this.posY = Math.random() * 100;
        this.velX = Math.random() < 0.5 ? 1 + Math.random() * 2 : -1 + Math.random() * -2;
        this.velY = Math.random() < 0.5 ? Math.random() * 3 : Math.random() * -3;
    }
    displace(valueX,valueY){
        this.posX += valueX
        this.posY += valueY
    }
    addVelocity(valueX,valueY){
        this.velX += valueX
        this.velY += valueY
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
        if(this.isOnMySpace(otherBall)){this.displace(deltaX >=0 ? -0.5 : 0.5 , 0)}
        if(this.isOnMySpace(otherBall)){this.displace(0 , deltaY >=0 ? -0.5 : 0.5)}
        if(this.isOnMySpace(otherBall)){otherBall.displace(deltaX >=0 ? 0.5 : -0.5 , 0)}
        if(this.isOnMySpace(otherBall)){otherBall.displace(0 , deltaY >=0 ? 0.5 : -0.5)}
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
            if(this.isOnMySpace(ball) && !Object.is(ball,this)){ 
                var deltaVX = ball.velX - this.velX
                var deltaVY = ball.velY - this.velY
                this.addVelocity(deltaVX,deltaVY)
                ball.addVelocity(deltaVX*-1,deltaVY*-1)
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

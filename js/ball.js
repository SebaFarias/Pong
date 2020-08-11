class Ball {
    constructor(_id,_posX,_posY,_velX,_velY,radius) {        
        this.radius = radius;
        this.posX = _posX >= 0? _posX : 50;
        this.posY = _posY >= 0? _posY : Math.random() * 100 ;
        this.velX = _velX < 100? _velX : Math.random() < 0.5 ? 1 + Math.random() * 1 : -1 + Math.random() * -1;
        this.velY = _velY < 100? _velY : Math.random() < 0.5 ? Math.random() * 2 : Math.random() * -2;
        this.id = _id;
    }
    reset(_posX,_posY,_velX,_velY){
        this.posX = _posX >= 0? _posX : 50;
        this.posY = _posY >= 0? _posY : Math.random() * 100 ;
        this.velX = _velX < 100? _velX : Math.random() < 0.5 ? 1 + Math.random() * 2 : -1 + Math.random() * -2;
        this.velY = _velY < 100? _velY : Math.random() < 0.5 ? Math.random() * 3 : Math.random() * -3;
    }     
    move(valueX,valueY){
        this.posX += valueX
        this.posY += valueY
    }
    accelerate(valueX,valueY){
        this.velX += valueX
        this.velY += valueY
    }   
    isOnMySpace(otherBall){
        if(this.id == otherBall.id)return false
        var deltaX = otherBall.posX - this.posX
        var deltaY = otherBall.posY - this.posY
        var distance = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2))
        return (distance < 2*this.radius) 
    }
    backOff(otherBall){
        var deltaX = otherBall.posX - this.posX
        var deltaY = otherBall.posY - this.posY
        if(this.isOnMySpace(otherBall)){this.move(0 , this.velY >=0 ? 0.5 : -0.5)}else{return}
        if(this.isOnMySpace(otherBall)){this.move(this.velX >=0 ? 0.5 : -0.5 , 0)}else{return}
        if(this.isOnMySpace(otherBall)){this.move(0 , this.velY >=0 ? 0.5 : -0.5)}else{return}
        if(this.isOnMySpace(otherBall)){otherBall.move(otherBall.velX >=0 ? 0.5 : -0.5 , 0)}else{return}
        if(this.isOnMySpace(otherBall)){otherBall.move(0 , otherBall.velY >=0 ? 0.5 : -0.5)}else{return}                
        if(deltaX==0){this.move(this.velX >=0 ? this.radius : -1*this.radius , 0)}else{return}
        if(deltaY==0){this.move(this.velY >=0 ? this.radius : -1*this.radius , 0)}else{return}
        if(this.isOnMySpace(otherBall)){this.backOff(otherBall)}
    }
    bounceAround() {
        if(this.posX <= 0 || this.posX >= 100){
            this.velX = Math.abs(this.velX) * (this.posX < 1 ? 1 : -1)
        }
        if(this.posY <= 0 || this.posY >= 100){
            this.velY = Math.abs(this.velY) * (this.posY < 1 ? 1 : -1)
        } 
    }
    otherBallsColide(balls) {
        balls.forEach(ball => {
            if(ball.id !== this.id && this.isOnMySpace(ball)){ 
                var deltaVX = ball.velX - this.velX
                var deltaVY = ball.velY - this.velY
                this.accelerate(deltaVX,deltaVY)
                ball.accelerate(deltaVX*-1,deltaVY*-1)
                this.backOff(ball)       
            }
        });
    }
    update(balls) {
        this.bounceAround()
        this.otherBallsColide(balls)
        this.move(this.velX,this.velY)
    }
}

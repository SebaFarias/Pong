SCORING_DISTANCE = 3
class Ball{
    constructor(_id,_posX,_posY,_velX,_velY,radius){        
        this.radius = radius;
        this.posX = _posX >= 0? _posX : 50;
        this.posY = _posY >= 0? _posY : Math.random() * 100 ;
        this.velX = _velX < 100? _velX : Math.random() < 0.5 ? 1 + Math.random() * 1 : -1 + Math.random() * -1;
        this.velY = _velY < 100? _velY : Math.random() < 0.5 ? Math.random() * 2 : Math.random() * -2;
        this.id = _id;
        this.isScoring = false;
    }
    reset(_posX,_posY,_velX,_velY){
        this.posX = _posX;
        this.posY = _posY >=  0? _posY : Math.random() * 100 ;
        this.velX = _velX < 100? _velX : Math.random() < 0.5 ? 1 + Math.random() * 1 : -1 + Math.random() * -1;
        this.velY = _velY < 100? _velY : Math.random() < 0.5 ? Math.random() * 2 : Math.random() * -2;
        this.isScoring = false
    }   
    update(balls){
        this.collide(initialized)
        this.otherBallsColide(balls)
        this.move(this.velX , this.velY)
        this.checkScoring()
        this.checkBugged()
    }  
    checkScoring(){
        if(!this.isScoring && (this.posX > 100 + SCORING_DISTANCE || this.posX < 0 - SCORING_DISTANCE)){
            this.isScoring = true
            if(this.posX > 50)sumScore('p1')
            if(this.posX < 50)sumScore('p2')
            setTimeout(()=>{
                this.reset(50,-1,100,100)
            },1000) 
            
        }
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
        let deltaX = otherBall.posX - this.posX
        let deltaY = otherBall.posY - this.posY
        let distance = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2))
        return (distance < 2*this.radius) 
    }
    backOff(otherBall){
        let deltaX = otherBall.posX - this.posX
        let deltaY = otherBall.posY - this.posY
        if(this.isOnMySpace(otherBall))this.move(0 , this.velY >=0 ? 0.5 : -0.5) 
        else return
        if(this.isOnMySpace(otherBall))this.move(this.velX >=0 ? 0.5 : -0.5 , 0)
        else return
        if(this.isOnMySpace(otherBall))otherBall.move(otherBall.velX >=0 ? 0.5 : -0.5 , 0)
        else return
        if(this.isOnMySpace(otherBall))otherBall.move(0 , otherBall.velY >=0 ? 0.5 : -0.5)
    }
    collide(initialized) {       
        if(this.posY <= 0 || this.posY >= 100){
            this.velY = Math.abs(this.velY) * (this.posY < 1 ? 1 : -1)
        }
        if (initialized) return
        if(this.posX <= 0 || this.posX >= 100){
            this.velX = Math.abs(this.velX) * (this.posX < 1 ? 1 : -1)
        }
    }
    otherBallsColide(balls) {
        balls.forEach(ball => {
            if(ball.id !== this.id && this.isOnMySpace(ball)){ 
                let deltaVX = ball.velX - this.velX
                let deltaVY = ball.velY - this.velY
                this.accelerate(deltaVX,deltaVY)
                ball.accelerate(deltaVX*-1,deltaVY*-1)
                this.backOff(ball)
            }
        });
    }  
    checkBugged(){
        if(this.posX < -1000 || this.posX > 1000)this.reset(50,-1,100,100)
        if(this.posY < -1000 || this.posY > 1000)this.reset(50,-1,100,100)
    } 
    randomHit(){
        this.reset(this.posX,this.posY,100,100)
    } 
}
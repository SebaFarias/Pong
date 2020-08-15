class Paddle{
    constructor(_leftSide,_halfSize,_mover){
        this.leftSide = _leftSide;
        this.thickness = BALL_RADIUS
        this.size = _halfSize;
        this.mover = _mover
        this.posX = _leftSide ? this.thickness : 100 - this.thickness;
        this.posY = 50;
        this.PosShouldBe = 50;
    }
    update(balls){
        this.calculateShouldBe(balls)
        this.reflectBalls(balls)
        this.move()
    }
    move(){
        let newPos
        let deltaPos = this.posY - this.PosShouldBe
        if(Math.abs(deltaPos) <= PADDLE_STEP)newPos = this.PosShouldBe
        else newPos = this.posY + (PADDLE_STEP * deltaPos > 0 ? -1 : 1)
        if(newPos - this.size <= 0 || newPos + this.size >= 100)newPos = this.posY < 50? this.size : 100-this.size
        this.posY = newPos
    }
    reflectBalls(balls){
        if(this.leftSide){
            balls.forEach(ball => {
                if(!ball.isScoring && ball.posX <= this.posX + (2 * BALL_RADIUS) && this.isOnMySpace(ball.posY)) ball.velX = Math.abs(ball.velX)
            });
        }
        else{
            balls.forEach(ball => {
                if(!ball.isScoring && ball.posX >= this.posX - (2 * BALL_RADIUS) && this.isOnMySpace(ball.posY)) ball.velX = Math.abs(ball.velX) * -1
            });
        } 
    }
    isOnMySpace(pos){
        return(pos <= this.posY + this.size + BALL_RADIUS && pos >= this.posY - this.size - BALL_RADIUS)
    }
    calculateShouldBe(balls){
        let sideCorrector = this.leftSide ? 1 : -1
        let closestBall = balls[0]
        balls.forEach(ball => {
            if( !ball.isScoring 
                && ball.velX * sideCorrector < 0 
                && ball.posX * sideCorrector < closestBall.posX * sideCorrector){
                 closestBall = ball
            }
        });
        this.PosShouldBe = closestBall.posY
        if(closestBall.isScoring) this.PosShouldBe = 50
    }
}
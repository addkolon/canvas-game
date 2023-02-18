import { SittingLeft, SittingRight, StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./states.js";

export let gameOver = false;
export let lives = 5;

// PLAYER
export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight - 110;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[1];
        this.image = document.getElementById('playerImage');
        this.width = 200;
        this.height = 181.83;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.maxFrame = 6;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.lives = lives;
        this.gameOver = gameOver;
    }
    draw(context) {

        // COLLISION BOX
        context.strokeStyle = 'white';
        //context.fillStyle = 'blue';
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        //context.stroke();
        //context.fill();
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime, enemies) {
        //Collition detection
        enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
            const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemy.width / 2 - 10 + this.width / 2 - 30) {
                //explosion.draw(ctx);
                //explosion.update();
                if (lives <= 1) {
                    gameOver = true;
                    
                } else {
                    lives--;
                    enemy.markForDeletion = true;
                }
            }
            console.log(lives);
            console.log(gameOver);
        });

        // Sprite animation
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
            //console.log(this.frameTimer += deltaTime);
        }

        //Controls
        this.currentState.handleInput(input);

        // horizonatal movement
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

        // vertical momvement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
            //this.maxFrame = 5;
        } else {
            this.vy = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter(); 
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}
// EMENY SPRITE
const bat = new Image();
bat.src = 'assets/images/enemy2.png';

const snail = new Image();
snail.src = 'assets/images/enemy_1.png';

export let score = 0;

// ENEMEY CLASS
export default class EnemyFlying {
    constructor(gameWidth, gameHeight, image) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight - 200;
        this.image = bat;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = this.gameWidth;
        this.y = Math.random() * (this.gameHeight - this.height);
        this.frameX = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameTimer = 10;
        this.frameInterval = 1000 / this.fps;
        this.speed = Math.random() * 8 + 1;
        this.markForDeletion = false;
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 7;
    }
    draw(context) {
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        //context.stroke();
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // console.log(deltaTime);

        this.x -= this.speed;
        this.y += (3 * Math.sin(this.angle));
        this.angle += 0.05;
        if (this.x < 0 - this.width) {
            this.markForDeletion = true;
            score++;
        }
    }
}
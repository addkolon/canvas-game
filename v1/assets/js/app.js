import Player, { gameOver } from './player.js';
import InputHandler from './input.js';
import EnemyFlying from './enemies.js';
//import {keyStatusText} from './utils.js';
import {displayStatusText} from './utils.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 700;
    let gameSpeed = 7;
    let enemies = [];
    


    // BG IMAGES
    const backgroundLayer1 = new Image();
    backgroundLayer1.src = 'assets/images/layer-1.png';
    const backgroundLayer2 = new Image();
    backgroundLayer2.src = 'assets/images/layer-2.png';
    const backgroundLayer3 = new Image();
    backgroundLayer3.src = 'assets/images/layer-3.png';
    const backgroundLayer4 = new Image();
    backgroundLayer4.src = 'assets/images/layer-4.png';
    const backgroundLayer5 = new Image();
    backgroundLayer5.src = 'assets/images/layer-5.png';

    // EXPLOSION
    const boom = new Image();
    boom.src = 'assets/images/boom.png';

    // EXPLOSION
    class Explosion {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.spriteWidth = 200;
            this.spriteHeight = 179;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.image = new Image();
            this.image.src  = '../assets/images/boom.png';
            this.maxFrame = 4;
            this.frameX = 0;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;

            // this.maxFrame = 8;
            // this.fps = 20;
            // this.frameTimer = 0;
            // this.frameInterval = 1000 / this.fps;
            // this.speed = 0;
            // this.vy = 0;
            // this.weight = 1;
        }
        draw(context) {
            // context.strokeStyle = 'white';
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            //Sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
        }

    }

    // BACKGROUND PARALLAX
    class BackgroundParallax {
        constructor(gameWidth, gameHeight, image, speedModifier) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;

        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
            //console.log(this.image);
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    // class EnemyGround {
    //     constructor(gameWidth, gameHeight, image) {
    //         this.gameWidth = gameWidth;
    //         this.gameHeight = gameHeight;
    //         this.image = snail;
    //         this.spriteWidth = 266;
    //         this.spriteHeight = 188;
    //         this.width = this.spriteWidth / 2.5;
    //         this.height = this.spriteHeight / 2.5;
    //         this.x = this.gameWidth;
    //         this.y = this.gameHeight - this.height - 120;
    //         this.frameX = 0;
    //         this.maxFrame = 5;
    //         this.fps = 20;
    //         this.frameTimer = 10;
    //         this.frameInterval = 1000 / this.fps;
    //         this.speed = Math.random() * 8 + 1;
    //         this.markForDeletion = false;
    //     }
    //     draw(context) {
    //         // context.strokeStyle = 'white';
    //         // context.beginPath();
    //         // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
    //         // context.stroke();
    //         context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    //     }
    //     update(deltaTime) {
    //         if (this.frameTimer > this.frameInterval) {
    //             if (this.frameX >= this.maxFrame) this.frameX = 0;
    //             else this.frameX++;
    //             this.frameTimer = 0;
    //         } else {
    //             this.frameTimer += deltaTime;
    //         }
    //         // console.log(deltaTime);
    //         this.x -= this.speed;
    //         if (this.x < 0 - this.width) {
    //             this.markForDeletion = true;
    //             score++;
    //         }
    //     }
    // }

    // ENEMIES HANDLER
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new EnemyFlying(canvas.width, canvas.height));
            //console.log(enemies);
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markForDeletion);
    }

    const explosion = new Explosion(50, 50, boom);
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    //const background = new Background(canvas.width, canvas.height);

    const layer1 = new BackgroundParallax(canvas.width, canvas.height, backgroundLayer1, 0.2);
    const layer2 = new BackgroundParallax(canvas.width, canvas.height, backgroundLayer2, 0.4);
    const layer3 = new BackgroundParallax(canvas.width, canvas.height, backgroundLayer3, 0.6);
    const layer4 = new BackgroundParallax(canvas.width, canvas.height, backgroundLayer4, 0.8);
    const layer5 = new BackgroundParallax(canvas.width, canvas.height, backgroundLayer5, 1);

    const gameBackgrounds = [layer1, layer2, layer3, layer4, layer5];
    //const backgroundParallax = new BackgroundParallax(canvas.width, canvas.height, gameSpeed);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 500;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        //console.log(lastTime);
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameBackgrounds.forEach(object => {
            object.draw(ctx);
            object.update();
        });
        player.draw(ctx);
        player.update(input.lastKey, deltaTime, enemies,);
        handleEnemies(deltaTime);
        //console.log(input.lastKey);
        displayStatusText(ctx);
        //keyStatusText(ctx, input);
        //requestAnimationFrame(animate);
        if (!gameOver) requestAnimationFrame(animate);

    }
    animate(0);
});
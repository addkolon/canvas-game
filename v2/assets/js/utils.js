
import {score} from './enemies.js';
import { lives, gameOver } from './player.js';

// export function keyStatusText(context, input) {
//     context.fillStyle = 'white';
//     context.font = '20px Helvetica';
//     context.fillText('Last input: ' + input.lastKey, 20, 40);
// };

// DISPLAY TEXT
export function displayStatusText(context) {
    context.fillStyle = 'black';
    context.font = '20px Helvetica';
    context.fillText('Score: ' + score, 20, 40);

    context.fillStyle = 'black';
    context.font = '20px Helvetica';
    context.fillText('Lives: ' + lives, 20, 80);
    context.width = 1200;
    context.height = 700;

    if (gameOver) {
        context.fillRect(0, 0, context.width, context.height);
        context.fillStyle = '#000';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.font = '80px Helvetica';
        context.fillText('GAME OVER', context.width / 2, 200);
        context.font = '40px Helvetica';
        context.fillText('SCORE: ' + score, context.width / 2, 300);
    }
}
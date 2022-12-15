'use strict';

let gameCanvas = $("#game-canvas")[0];
let image = $("#main-sprite")[0];
let ctx = gameCanvas.getContext("2d");



let frameIndex = 0,
    framesCount = 6,
    ticksPerFrame = 5,
    loopTicksCount = 0,
    playerX = 50,
    playerY = 50,
    speedX = 10;

function gameLoop() {
    if (speedX > 0) {
        ctx.clearRect(playerX - 10, playerY, 3 * image.width / framesCount, 3 * image.height);
    } else if (speedX < 0) {
        ctx.clearRect(playerX + 10, playerY, 3 * image.width / framesCount, 3 * image.height);
    }

    ctx.drawImage(image,
        frameIndex * image.width / framesCount + 1.5,
        0,
        image.width / framesCount - 2.6,
        image.height,
        playerX,
        playerY,
        3 * image.width / framesCount,
        3 * image.height);
    playerX += speedX;
    if ((playerX + 120 > gameCanvas.width) || (playerX + 30 <= 0)) {
        speedX = -speedX;
    };

    loopTicksCount += 1;

    if (loopTicksCount >= ticksPerFrame) {

        loopTicksCount = 0;

        frameIndex += 1;
        if (frameIndex >= framesCount) {
            frameIndex = 0;
        }
    }

    window.requestAnimationFrame(gameLoop)
}
gameLoop();
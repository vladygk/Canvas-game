var fighter = createSprite({
    spriteSheet: imagePlayer,
    width: imagePlayer.width / 6,
    height: imagePlayer.height,
    context: playerContext,
    numberOfFrames: 6,
    loopTicksPerFrame: 5
});


var evilEnemy = createSprite({
    spriteSheet: imageEvilEnemy,
    width: imageEvilEnemy.width / 2,
    height: imageEvilEnemy.height,
    context: enemyContext,
    numberOfFrames: 2,
    loopTicksPerFrame: 8
});


var dead = createSprite({
    spriteSheet: imageDead,
    width: imageDead.width / 3,
    height: imageDead.height,
    context: playerCanvas,
    numberOfFrames: 3,
    loopTicksPerFrame: 20
});


var wolverine = createSprite({
    spriteSheet: imageWolverine,
    width: imageWolverine.width / 8,
    height: imageWolverine.height,
    context: playerCanvas,
    numberOfFrames: 8,
    loopTicksPerFrame: 5
});

var enemy = createSprite({
    spriteSheet: imageEnemy,
    width: imageEnemy.width / 6,
    height: imageEnemy.height,
    context: playerCanvas,
    numberOfFrames: 6,
    loopTicksPerFrame: 10
});

var frankenstein = createSprite({
    spriteSheet: imageFrankenstein,
    width: imageFrankenstein.width / 5,
    height: imageFrankenstein.height,
    context: playerCanvas,
    numberOfFrames: 5,
    loopTicksPerFrame: 5
});
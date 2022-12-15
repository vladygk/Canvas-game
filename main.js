window.addEventListener("load", function() {
    'use strict';
    let audio = $("#audio")[0];
    let audioOn = $("#audio-on")[0];
    let audioMute = $("#audio-mute")[0];
    $(audioOn).on("click", function() {
        audio.muted = "";
    });
    $(audioMute).on("click", function() {
        audio.muted = "muted";
    });
    let reloadButton = $("#reload")[0];
    $(reloadButton).on("click", function() {
        location.reload();
    });




    let playerCanvas = $("#player-canvas")[0];
    let enemyCanvas = $("#enemy-canvas")[0];
    let deadCanvas = $("#dead-canvas")[0];

    let imagePlayer = $("#main-sprite")[0];
    let imageEnemy = $("#enemy-sprite")[0];
    let imageWolverine = $("#wolverine-sprite")[0];
    let imageFrankenstein = $("#frankenstein-sprite")[0];
    let imageDead = $("#dead-sprite")[0];
    let imageEvilEnemy = $("#evil-sprite")[0];
    let endgameShrek = $("#endgame-sprite")[0];
    let jumpingPlayer = $("#jumping-sprite")[0];

    let playerContext = playerCanvas.getContext("2d");
    let enemyContext = enemyCanvas.getContext("2d");
    let deadContext = deadCanvas.getContext("2d");

    var fighter = createSprite({
        spriteSheet: imagePlayer,
        width: imagePlayer.width / 6,
        height: imagePlayer.height,
        context: playerContext,
        numberOfFrames: 6,
        loopTicksPerFrame: 5
    });


    var jumpingFighter = createSprite({
        spriteSheet: jumpingPlayer,
        width: jumpingPlayer.width,
        height: jumpingPlayer.height,
        context: playerContext,
        numberOfFrames: 1,
        loopTicksPerFrame: 5
    });



    var physicalFighter = createPhysicalBody({
        coordinates: { x: 0, y: 100 },
        speed: { x: 0, y: 0 },
        height: fighter.height,
        width: fighter.width

    });


    var dead = createSprite({
        spriteSheet: imageDead,
        width: imageDead.width / 3,
        height: imageDead.height,
        context: playerCanvas,
        numberOfFrames: 3,
        loopTicksPerFrame: 20
    })






    window.addEventListener("keydown", function(event) {
        if (event.keyCode === 70) {
            physicalFighter.speed.y = -15;
        }
    })
    window.addEventListener("keydown", function(event) {
        if (physicalFighter.speed.y === 0) {
            if (event.which === 38 || event.which === 32) {

                physicalFighter.speed.y = -40;
            }
        }
        if (event.which === 68 || event.which === 39) {
            physicalFighter.speed.x = 10;
        }
        if (event.which === 65 || event.which === 37) {
            physicalFighter.speed.x = -10;
        }
    });
    window.addEventListener("keyup", function(event) {
        if (event.which === 68 || event.which === 39 || event.which === 65 || event.which === 37) {
            physicalFighter.speed.x = 0;
        }
    })



    function applyGravity(physicalBody, gravity, zoom) {

        if (physicalBody.coordinates.y === (playerCanvas.height - physicalBody.height * zoom)) {
            return;
        }
        if (physicalBody.coordinates.y > (playerCanvas.height - physicalBody.height * zoom)) {
            physicalBody.coordinates.y = (playerCanvas.height - physicalBody.height * zoom);
            physicalBody.speed.y = 0;
            return;
        }

        physicalBody.speed.y += gravity;

    }

    function spawnEnemies(offsetX) {
        var evilEnemy = createSprite({
            spriteSheet: imageEvilEnemy,
            width: imageEvilEnemy.width / 2,
            height: imageEvilEnemy.height,
            context: enemyContext,
            numberOfFrames: 2,
            loopTicksPerFrame: 8
        });

        let physicalEvilEnemy = createPhysicalBody({
            coordinates: { x: offsetX, y: playerCanvas.height - evilEnemy.height },
            speed: { x: -8, y: 0 },
            height: evilEnemy.height,
            width: evilEnemy.width
        });



        return {
            sprite: evilEnemy,
            body: physicalEvilEnemy
        };

    }


    var background = CreateBackground({ width: 1024, height: 700 });


    var enemies = [];

    var counter = 0;

    var currentSprite = fighter;

    function gameLoop() {


        applyGravity(physicalFighter, 1.8, 1.5);


        let lastPlayerCoord = physicalFighter.move();

        console.log(physicalFighter.coordinates.y);
        console.log((playerCanvas.height - physicalFighter.height * 1.5));

        if (Math.abs(physicalFighter.coordinates.y) < (playerCanvas.height - physicalFighter.height * 1.5)) {

            currentSprite = jumpingFighter;
        } else if (Math.abs(physicalFighter.coordinates.y) === (playerCanvas.height - physicalFighter.height * 1.5)) {
            currentSprite = fighter;
        }

        currentSprite.render(physicalFighter.coordinates, lastPlayerCoord, 1.5, 3)
            .update();
        // dead.render({ x: 300, y: 440 }, { x: 300, y: 440 }, 3).update();





        for (let i = 0; i < enemies.length; i += 1) {

            if (enemies[i].body.coordinates.x + enemies[i].body.width + 100 < 0) {
                enemies.splice(i, 1);
                i += 1;
                counter += 1;
                continue;
            }


            applyGravity(enemies[i].body, 2, 2);

            let lastEnemyCoord = enemies[i].body.move();

            enemies[i].sprite.render(enemies[i].body.coordinates, lastEnemyCoord, 2, 3)
                .update();

            if (physicalFighter.collidesWith(enemies[i].body)) {

                deadContext.drawImage(endgameShrek, 0, 0, deadCanvas.width, deadCanvas.height);

                $($("#song1")[0]).attr("src", "./song/Super Mario.mp3");

                audio.pause();
                audio.load();
                audio.play();

                return;

            }




        }

        if (Math.random() < 0.02) {

            if (enemies.length) {

                let lastEnemy = enemies[enemies.length - 1];
                if (lastEnemy.body.coordinates.x + lastEnemy.body.width > playerCanvas.width) {
                    let newEnemy = spawnEnemies(lastEnemy.body.coordinates.x + lastEnemy.body.width * 1.5);
                    enemies.push(newEnemy);
                }
            } else {
                enemies.push(spawnEnemies(playerCanvas.width));
            }
        }

        background.render().update();

        let highScore = $("#high-score")[0];
        let score = $("<h2>").html(counter * 11);

        $(highScore).html(`Highscore: `);
        $(highScore).append(score);


        window.requestAnimationFrame(gameLoop)
    }


    gameLoop();





});
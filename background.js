'use strict';

function CreateBackground(options) {
    let backgroundCanvas = $("#background-canvas")[0];
    let backgroundContext = backgroundCanvas.getContext("2d");
    let backgroundImg = $("#background-sprite")[0];

    backgroundCanvas.height = options.height;
    backgroundCanvas.width = options.width;


    function render() {


        backgroundContext.drawImage(this.image, this.coordinates.x, 0);

        backgroundContext.drawImage(this.image, this.image.width - Math.abs(this.coordinates.x), 0);


        return this;
    }



    function update() {

        if (Math.abs(this.coordinates.x) > this.image.width) {
            this.coordinates.x = 0;

        }
        this.coordinates.x += -5;
        return this;
    }


    let background = {
        image: backgroundImg,
        coordinates: { x: 0, y: 0 },
        speedX: 5,
        render: render,
        update: update,

    };
    return background;
}
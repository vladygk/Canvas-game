function createSprite(options) {
    function render(drawCoord, clearCoord, zoom = 1, add = 1.5) {



        this.context.clearRect(
            clearCoord.x,
            clearCoord.y,
            this.width * zoom,
            this.height * zoom
        );
        this.context.drawImage(
            this.spriteSheet,
            this.frameIndex * this.width + add,
            0,
            this.width - 5,
            this.height,
            drawCoord.x,
            drawCoord.y,
            this.width * zoom,
            this.height * zoom
        );
        return this;
    };

    function update() {
        this.loopTicksCount += 1;

        if (this.loopTicksCount >= this.loopTicksPerFrame) {

            this.loopTicksCount = 0;

            this.frameIndex += 1;
            if (this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
        }
        return this;
    };



    var sprite = {
        spriteSheet: options.spriteSheet,
        context: options.context,
        width: options.width,
        height: options.height,
        numberOfFrames: options.numberOfFrames,
        frameIndex: 0,
        loopTicksCount: 0,
        loopTicksPerFrame: options.loopTicksPerFrame,
        render: render,
        update: update
    };
    return sprite;
}
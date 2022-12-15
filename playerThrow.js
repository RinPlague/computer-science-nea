class playerThrow {
    constructor(in_animation, in_x, in_y) {
        this.animation = in_animation;
        this.x = in_x;
        this.y = in_y;
        //this.width = this.animation[0].w;
        //this.frames = this.animation.length;
        //this.fps = 0.1;
        this.index = 0;
        this.frameCounter = 0;
        this.interval = 20;
    }

    isDone() {
       return this.index >= 6
    }

    animate() {
        if (!this.isDone()) {
            this.frameCounter += 1;
            image(this.animation[this.index], this.x, this.y);
            if ((this.frameCounter % this.interval) == 0) {
                //console.log(this.animation.length)
                this.index += 1;
            }
        }
    }


}
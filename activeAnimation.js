class activeAnimation {
    constructor(in_animations) {
    this.animations = in_animations;
    this.progress = 0;
    }

    compute(currentLocation) {
        if (!this.isDone()) {
            if (this.progress > this.animations[0].frameDuration) {
                this.progress = 1;
                this.animations.shift();

                if (!this.isDone()) {
                    return this.animations[0].compute(currentLocation);
                } else {
                    return currentLocation;
                }

            } else {
                this.progress += 1;
                return this.animations[0].compute(currentLocation);
            }

        } else {
            return currentLocation;
        }
    }

    isDone() {
        return this.animations.length == 0 
    }
}
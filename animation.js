class animation {
    constructor(in_duration_frames, in_target_location_adjustment) {
        this.frameDuration = in_duration_frames;
        this.targetLocationAdjustment = in_target_location_adjustment;
    }

    compute(currentLocation) {
        let computedX = this.targetLocationAdjustment.x / this.frameDuration;
        let computedY = this.targetLocationAdjustment.y / this.frameDuration;

        currentLocation.adjust(computedX, computedY)
        return currentLocation;
        
    }
}
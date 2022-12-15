class coordinates {
    constructor(in_X, in_Y) {
        this.x = in_X;
        this.y = in_Y;
    }

    adjust(x, y) {
        this.x += x;
        this.y += y;
    }

    toString() {
        return "x=" + this.x + ", y=" + this.y;
    }
}
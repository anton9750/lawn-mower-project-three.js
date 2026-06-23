export class ScoreSystem {
    constructor(lawn) {
        this.lawn = lawn;
    }
    update() {
        this.cutCount = this.lawn.tiles.filter(t => t.isCut).length;
    }
    getPercentage() {
        return Math.floor((this.cutCount / this.lawn.tiles.length) * 100);
    }
}
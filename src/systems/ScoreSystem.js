export class ScoreSystem {
    constructor(lawn) {
        this.lawn = lawn;
        this.cutCount = 0;
    }
    
    update() {
        // Ensure tiles exist before filtering
        if (this.lawn && this.lawn.tiles) {
            this.cutCount = this.lawn.tiles.filter(t => t.isCut).length;
        }
    }
    
    getPercentage() {
        if (!this.lawn.tiles || this.lawn.tiles.length === 0) return 0;
        return Math.floor((this.cutCount / this.lawn.tiles.length) * 100);
    }
}
export class GameStateManager {
    constructor(lawn, score) {
        this.score = score;
        this.isGameOver = false;
    }
    update() {
        if (!this.isGameOver && this.score.getPercentage() >= 100) {
            this.isGameOver = true;
            alert("Victory! Lawn Mowed.");
        }
    }
}
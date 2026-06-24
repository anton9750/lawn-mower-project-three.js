export class GameStateManager {
    constructor(lawn, score) {
        this.lawn = lawn; // Keep reference if needed for other checks
        this.score = score;
        this.isGameOver = false;
    }
    
    update() {
        // Goal reached (100% to complete the stage)
        if (!this.isGameOver && this.score.getPercentage() >= 100) {
            this.isGameOver = true;
        }
    }

    // This method is required to let the Game class restart the loop
    reset() {
        this.isGameOver = false;
    }
}
export class CoinSystem {
    constructor() {
        this.coins = 0;
        this.stagesCompleted = 0;
    }

    addCoins(amount) {
        this.coins += amount;
    }

    spendCoins(amount) {
        if (this.coins >= amount) {
            this.coins -= amount;
            return true;
        }
        return false;
    }

    incrementStages() {
        this.stagesCompleted++;
    }
}
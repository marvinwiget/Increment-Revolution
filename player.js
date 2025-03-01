export class Player {
    constructor(game) {
        this.game = game;
        this.score = 0;
        this.combo = 0;
        this.totalIncome = 0;
        this.lastTotalIncome = 0;
        this.incomeMult = 1;
        this.comboMult = 1;
        this.upgrades = [];
        this.mpd = 0;
        this.passiveIncomeValue = 0;
        this.prestiges = 0;
        this.totalMult = 1;
    }

    add(value) {
        this.totalMult = this.incomeMult * (this.prestiges+1) * this.comboMult;
        this.score += value * this.totalMult;
        this.totalIncome += value * this.totalMult;
        
    }

    prestigeReset() {
        this.score = 0;
        this.combo = 0;
        this.totalIncome = 0;
        this.comboMult = 1;
        this.lastTotalIncome = 0;
        this.incomeMult = 1;
        this.upgrades = [];
        this.mpd = 0;
        this.passiveIncomeValue = 0;

        this.game.arrowValue = 1;
        this.game.upgrade1Price = 10;
        this.game.upgrade2Price = 5;
        this.game.upgrade3Price = 20;
        this.game.updateUpgrade1Button();
        this.game.updateUpgrade2Button();
        this.game.updateUpgrade3Button();
    }
}
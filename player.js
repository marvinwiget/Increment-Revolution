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
    }

    add(value) {
        this.score += value * this.incomeMult * (this.prestiges+1) * this.comboMult;
        this.totalIncome += value * this.incomeMult * this.comboMult;
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
    }
}
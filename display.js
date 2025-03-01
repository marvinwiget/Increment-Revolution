
export class Display {
    constructor(game,player) {
        this.game = game;
        this.player = player;
        this.displayScore = document.getElementById("displayScore");
        this.displayCurrentMultiplier = document.getElementById("currentMultiplier");
        this.displayMPD = document.getElementById("moneyPerSecond");
        this.displayCombo = document.getElementById("combo");


        this.achieve1 = document.getElementById("achievement1");
        this.achieve2 = document.getElementById("achievement2");
        this.achieve3 = document.getElementById("achievement3");
        this.achieve4 = document.getElementById("achievement4");

    }

    update() {
        this.displayScore.innerHTML = "You have $" + Math.floor(this.player.score) + ", and " + this.player.prestiges + " prestige(s)";
        this.displayCurrentMultiplier.innerHTML = "Current multiplier: " + (Math.floor(this.player.totalMult *100)) / 100 + "x";
        this.displayMPD.innerHTML = "Generating $" + (Math.floor(this.player.mpd*100)) /100 + " per second";
        this.displayCombo.innerHTML = this.player.combo + "X COMBO!";
        if (this.player.combo < 4) this.displayCombo.style.visibility = "hidden";
        else this.displayCombo.style.visibility = "visible";

        // achievements
        this.achieve1.innerHTML = "New beginnings: Get the first prestige";
        this.achieve2.innerHTML = "Is this enough?: Get a multiplier of 9999x";
        this.achieve3.innerHTML = "The end: Max out your prestige";
        this.achieve4.innerHTML = "???";
        if (this.player.prestiges == Number.MAX_SAFE_INTEGER) this.achieve4.innterHTML = "INTEGER OVERFLOW"

        if (this.player.prestiges >= 1) this.achieve1.style.backgroundColor = "lightgreen";
        if (this.player.incomeMult*this.player.comboMult >= 9999) this.achieve2.style.backgroundColor = "lightgreen";
        if (this.player.prestiges == this.game.prestigeCost.length-1) this.achieve3.style.backgroundColor = "lightgreen";
        if (this.player.prestiges == Number.MAX_SAFE_INTEGER) this.achieve4.style.backgroundColor = "lightgreen";
    }

}
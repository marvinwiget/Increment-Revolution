import { Player } from "./player.js";
import { Arrow } from "./arrow.js";
import { Display } from "./display.js";


export class Game {
    constructor (width,height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.display = new Display(this, this.player);
        this.arrows = [];
        this.removedIndexArrows = [];
        this.canvas = document.getElementById("arrowBox");
        this.ctx = this.canvas.getContext("2d");
        this.arrowValue = 1;
        this.arrowSpeed = 5;
        this.prestigeCost = [500,10000,500000,3000000,100000000, 999999999999]
        this.upgrade1Price = 10;
        this.upgrade2Price = 5;
        this.upgrade3Price = 20;
        this.arrowLeft = true;

        this.soundMuted = false

        this.prestigeSound = new Audio("./assets/prestige.wav");
        this.buySound = new Audio("./assets/buy.wav");
        this.failSound = new Audio("./assets/fail.wav");
        this.hitSound = new Audio("./assets/hit.wav");

        this.updateUpgrade1Button();
        this.updateUpgrade2Button();
        this.updateUpgrade3Button();
        this.updatePrestigeButton();
        this.updateSoundButton();
        this.checkCombo();

        document.getElementById("achievements").style.display = "none";
        this.updateUpgradeTab();
        this.updateAchievementTab();
        
    }
    image = document.getElementById("arrowSprite");

    updateUpgradeTab() {
        const upgradeTab = document.getElementById("upgradeTab");
        if (upgradeTab) {
            upgradeTab.onclick = () => {
                document.getElementById("achievements").style.display = "none";
                document.getElementById("upgrades").style.display = "inline";
                this.updateUpgradeTab();
            }
        }
    }

    updateAchievementTab() {
        const achievementTab = document.getElementById("achievementTab");
        if (achievementTab) {
            achievementTab.onclick = () => {
                document.getElementById("achievements").style.display = "inline";
                document.getElementById("upgrades").style.display = "none";
                this.updateAchievementTab();
            }
        }
    }

    checkCombo() {
        if (this.player.combo >= 4) {
            this.player.comboMult = 0.3 * this.player.combo;
        } else this.player.comboMult = 1;
    }

    updateUpgrade1Button() {
        const upgradeButton1 = document.getElementById("upgrade1");
        if (!upgradeButton1) return;

        upgradeButton1.innerHTML = "1.25x money for $" + (Math.floor(this.upgrade1Price*100))/100;
        upgradeButton1.onclick = () => {
            if (this.player.score >= this.upgrade1Price) {
                this.player.incomeMult *= 1.25;
                this.player.score -= this.upgrade1Price;
                this.upgrade1Price *= 1.5;
                if (!this.soundMuted) this.buySound.play();
                this.updateUpgrade1Button();
            }
        };
    }

    updateUpgrade2Button() {
        const upgradeButton2 = document.getElementById("upgrade2");
        if (upgradeButton2) {
            upgradeButton2.innerHTML = "Increase value of each arrow for $" + (Math.floor(this.upgrade2Price*100))/100;
            upgradeButton2.onclick = () => {
                if (this.player.score >= this.upgrade2Price) {
                    this.arrowValue += 1;
                    this.player.score -= this.upgrade2Price;
                    this.upgrade2Price *= 1.5;
                    if (!this.soundMuted) this.buySound.play();
                    this.updateUpgrade2Button();
                }
            };
        }
    }
    updateUpgrade3Button() {
        const upgradeButton3 = document.getElementById("upgrade3");
        if (upgradeButton3) {
            upgradeButton3.innerHTML = "Increase passive income for $" + (Math.floor(this.upgrade3Price*100))/100;
            upgradeButton3.onclick = () => {
                if (this.player.score >= this.upgrade3Price) {
                    this.player.passiveIncomeValue += 1;
                    this.player.score -= this.upgrade3Price;
                    this.upgrade3Price *= 1.5;
                    if (!this.soundMuted) this.buySound.play();
                    this.updateUpgrade3Button();
                }
            };
        }
    }
    
    updatePrestigeButton() {
        const prestigeButton = document.getElementById("prestige");
        if (!prestigeButton) return;
    
        if (this.player.prestiges <= this.prestigeCost.length) {
            prestigeButton.innerHTML = "Prestige for $" + this.prestigeCost[this.player.prestiges];
            prestigeButton.onclick = () => {
                if (this.player.score >= this.prestigeCost[this.player.prestiges]) {
                    this.player.prestiges++;
                    this.player.prestigeReset();
                    if (!this.soundMuted) this.prestigeSound.play();
                    this.updatePrestigeButton();
                }
            };
        } else {
            prestigeButton.innerHTML = "MAX PRESTIGE";
            prestigeButton.onclick = null; // Disable further prestiging
        }
    }
    
    updateSoundButton() {
        const soundButton = document.getElementById("sound"); 
        if (soundButton) {
            if (this.soundMuted) soundButton.innerHTML = "Sound: OFF";
            else soundButton.innerHTML = "Sound: ON";
            soundButton.onclick = () => {
                this.soundMuted = !this.soundMuted;
                this.updateSoundButton();
            }
        }
    }
    
    input = {
        activeInput: [],
        allowedInput: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
        onInputCooldown: false,
        reactionTime: 100,
        inputCooldown: 250
    }
    createArrows() {
        let x = Math.floor(Math.random() * 4);
        //let y = Math.floor(Math.random() * 2);
        let y;
        if (this.arrowLeft) y = 0;
        else y = 1;
        this.arrowLeft = !this.arrowLeft;
        
        this.arrows.push(new Arrow(this,this.player,x,this.arrowSpeed + 0.3 * this.player.combo,y,this.arrowValue));
        
    }

    passiveIncome() {
        this.player.add(this.player.passiveIncomeValue);

        // combo income
        this.checkCombo();
    }

    moneyPerSecond() {
        this.player.mpd = this.player.totalIncome - this.player.lastTotalIncome
        this.player.lastTotalIncome = this.player.totalIncome;
    }
    update() {
        this.display.update();
        for (let i = this.arrows.length - 1; i >= 0; i--) {  // Iterate backwards
            this.arrows[i].update();
            if (this.arrows[i].despawn) {
                this.arrows.splice(i, 1); // Safe removal
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear once before drawing everything
        this.ctx.drawImage(this.image,0,0,720,100,0,0,720,100);
        for (let i = 0; i < this.arrows.length; i++) {
            this.arrows[i].draw(this.ctx);
        }
}
}

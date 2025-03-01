export class Achievement {
    constructor(game,player,name,requirement) {
        this.game = game;
        this.player = player;
        this.requirement = requirement;
        this.name = name;
        this.achieved = false;
    }
}
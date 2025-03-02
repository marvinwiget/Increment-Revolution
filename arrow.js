export class Arrow {
    constructor(game, player, direction, speed, side,value) {
        this.game = game;
        this.player = player;
        this.canvas = this.game.canvas;
        this.width = 85;
        this.height = 100;
        this.x = -this.width;
        this.y = 0;
        this.speed = speed;
        this.side = side; // 0: left, 1: right
        this.direction = direction // 0: right, 1: left, 2: up, 3: down
        this.initialized = false;
        this.zoneStart = (this.canvas.width / 7) * 3; 
        this.zoneEnd = this.canvas.width - this.zoneStart;
        this.despawn = false;
        this.inZone = false;
        this.value = value;
        
    }
    image = document.getElementById("arrowSprite");
;
    update() {
        if (!this.initialized) {
            if (this.side == 1) {
                this.x = this.canvas.width;
                this.initialized = true;
            }
        }
        if (this.side == 0) {
            // move
            this.x += this.speed;
            // check if in zone
            if (this.x >= this.zoneStart) this.inZone = true;

            // check if out of bounds
            if (this.x > this.zoneStart + (this.zoneEnd - this.zoneStart) / 6) {
                this.despawn = true;
                if (!this.game.soundMuted && this.player.combo > 0) this.game.failSound.play();
                this.player.combo = 0;
                return;
            }
        } else {
            // move
            this.x -= this.speed;

            // check if in zone
            if (this.x <= this.zoneStart + (this.zoneEnd - this.zoneStart)) this.inZone = true;

            // check if out of bounds
            if (this.x < this.zoneStart + (this.zoneEnd - this.zoneStart) / 6) {
                this.despawn = true;
                if (!this.game.soundMuted && this.player.combo > 0) this.game.failSound.play();
                this.player.combo = 0;
                return;
            }
        }
        if (this.inZone && ((this.game.input.activeInput[0] == "ArrowRight" && this.direction == 0) 
            || (this.game.input.activeInput[0] == "ArrowLeft" && this.direction == 1) 
            || (this.game.input.activeInput[0] == "ArrowUp" && this.direction == 2) 
            || (this.game.input.activeInput[0] == "ArrowDown" && this.direction == 3))) {
                this.despawn = true;
                this.player.add(this.value);
                this.player.combo++;
                if (!this.game.soundMuted) this.game.hitSound.play();
        }
        this.speed += 0.1;
    }
    static drawBackground(ctx) {
        ctx.drawImage(image,0,0,720,100,0,0,720,100);
    }
    draw(ctx) {
        ctx.drawImage(this.image,this.direction * this.width, 300,this.width,this.height,this.x,this.y, this.width,this.height);
    }

}
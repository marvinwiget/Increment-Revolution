import { Game } from "./game.js";


window.onload = function() {

    const game = new Game(1920, 1080);

    document.addEventListener("keydown", (e) => {
        
        if (game.input.allowedInput.includes(e.key) && !game.input.onInputCooldown) {
            game.input.activeInput.push(e.key);
            game.input.onInputCooldown = true;
            setTimeout(() => {
                game.input.onInputCooldown = false;
            }, game.input.inputCooldown)
            setTimeout(() => {
                game.input.activeInput.splice(game.input.activeInput.indexOf(e.key), 1);
            }, game.input.reactionTime)
        }
    })

    setInterval(() => game.createArrows(), 1000);
    setInterval(() => game.moneyPerSecond(), 1000)
    setInterval(() => game.passiveIncome(), 1000);
  
    function render() {
        game.update();
        game.draw();
        requestAnimationFrame(render)
    }
    render();

}
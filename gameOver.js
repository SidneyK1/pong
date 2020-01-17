export default class GameOver {
    preload() {
        this.game.load.image('Court', './assets/background2.jpg')
        this.load.spritesheet('returnToHome', './assets/button_hauptmenu.png', 157, 40);
        this.load.spritesheet('playAgain', './assets/button_neues-spiel.png', 154, 40);

    }

    create() {
        this.add.image(0, 0, 'Court')
        this.add.button(this.world.centerX - 80, 550, 'returnToHome', this.returnToHome,this, 2, 1, 0);
        this.add.button(this.world.centerX - 80, 460, 'playAgain', this.playsameAgain,this, 2, 1, 0);
        const winner = localStorage.getItem('winner');
        const result = JSON.parse(localStorage.getItem('gameResult'));
        result.player1
        result.player2
        this.game.add.text(80, 90, `      ${winner} \n hat gewonnen`, {
            font: "48px Arial",
            fill: "#fff",
            algin: "center"
        });
        this.game.add.text(125, 255, `${result.player1} :`, {
            font: "128px Arial",
            fill: "#EC0909"
        });
        this.game.add.text(295, 255, result.player2, {
            font: "128px Arial",
            fill: "#EC0909",
        });
    }

    update() {}
  
    returnToHome() {
        this.state.start('welcome');
    }

    playsameAgain() {
        this.state.start('game')
    }
}
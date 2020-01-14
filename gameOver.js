export default class GameOver {
    preload() {
        this.game.load.image('Court', './assets/background2.jpg')
        this.load.spritesheet('returnToHome', './assets/button_hauptmenu.png', 157, 40);
        this.load.spritesheet('playAgain', './assets/button_neues-spiel.png', 154, 40);

    }

    create() {
        this.add.image(0, 0, 'Court')
        this.add.button(this.world.centerX - 75, 500, 'returnToHome', this.returnToHome,this, 2, 1, 0);
        this.add.button(this.world.centerX - 75 , 400, 'playAgain', this.playsameAgain,this, 2, 1, 0);
        const winner = localStorage.getItem('winner');
        this.game.add.text(this.world.centerX - 100, this.game.world.height - 500, `${winner} has won`, {
            font: "32px Gabriella",
            fill: "#ffffff",
            algin: "center"
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
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
        this.game.add.text(31, 150, `     ${winner} \n hat gewonnen`, {
            font: "64px Arial",
            fill: "#EC0909",
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
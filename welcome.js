export default class Welcome {

    preload() {
        this.game.load.image('Court', './assets/background2.jpg')
        this.load.spritesheet('singlePlayerButton', './assets/button_einzelspieler.png', 166, 40);
        this.load.spritesheet('multiPlayerButton', './assets/button_mehrspieler.png', 162, 40);
        this.load.spritesheet('control', './assets/button_steuerung.png', 142, 40);
    }
  
    create() {
        this.add.image(0, 0, 'Court')

        this.add.button(this.world.centerX - 90, 480, 'singlePlayerButton', this.startSinglePlayer, this, 2, 1, 0);
        this.add.button(this.world.centerX - 88, 550, 'multiPlayerButton', this.startMultiPlayer,this, 2, 1, 0);
        this.add.button(this.game.world.centerX - 77, this.game.world.centerY + 240, 'control', this.showControls, this, 2, 1, 0);

        this.game.add.text(this.world.centerX - 95, 130, 'PONG', {
            font: "64px Arial",
            fill: "#fff",
            algin: "center"
        });
    }
    update() {}
  
    startSinglePlayer() {
        localStorage.setItem('pongMultiplayer', 0);
        this.state.start('chooseDifficulty');
    }

    startMultiPlayer() {
        localStorage.setItem('pongMultiplayer', 1);
        this.state.start('chooseDifficulty')
    }

    showControls() {
        this.state.start('controls')
    }

  }
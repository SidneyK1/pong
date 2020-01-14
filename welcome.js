export default class Welcome {

    /**
     * Diese Funktion wird ausgeführt, bevor das Spiel geladen wird, um 
     * Bilder zwischenzuspeichern, die das Spiel verwendet.
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#preload
     * https://photonstorm.github.io/phaser-ce/Phaser.Game.html#load
     */
    preload() {
        this.load.spritesheet('singlePlayerButton', './assets/button_einzelspieler.png', 200, 73);
        this.load.spritesheet('multiPlayerButton', './assets/button_mehrspieler.png', 200, 73 )
    }
  
    /**
     * Diese Funktion wird beim Anlegen des Spiels als erstes ausgeführt.
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxWidth = this.game.width;
        this.scale.maxHeight = this.game.height;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Hintergrundfarbe 
        // https://photonstorm.github.io/phaser-ce/Phaser.Stage.html#backgroundColor
        this.stage.backgroundColor = '#FF620E';

        this.add.button(this.world.centerX - 100, 180, 'singlePlayerButton', this.startSinglePlayer, this, 2, 1, 0);
        this.add.button(this.world.centerX - 100, 300, 'multiPlayerButton', this.startMultiPlayer,this, 2, 1, 0);

        this.game.add.text(this.game.centerX, this.game.world.height - 100, 'Welcome to', {
            font: "32px Gabriella",
            fill: "#ffffff",
            algin: "center"
        });
    }
  
    /**
     * Hauptfunktion des Spiels, dass automatisch von der Phaser-Engine
     * in einer Endlosschleife immer wieder aufgerufen wird.
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     * 
     */
    update() {}
  
    startSinglePlayer() {
        this.state.start('game');
    }

    startMultiPlayer() {
        // TODO: multiplayer stuff
        this.state.start('game')
    }
  }
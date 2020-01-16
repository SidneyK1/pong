export default class ChooseDifficulty {

    preload() {
        this.load.spritesheet('HardB', './assets/button_hardcore.png', 146, 54);
        this.load.spritesheet('NormalB', './assets/button_normal.png', 128, 54);
        this.game.load.image('BG', './assets/background2.jpg');
    }

    create() {
        this.add.image(0, 0, 'BG');
        const normal = this.add.button(170, 450, 'NormalB', this.goNormal, this, 2, 1, 0);
        const hard = this.add.button(160, 550, 'HardB', this.goHard, this, 2, 1, 0);
        normal.scale.setTo(1.2, 1.2);
        hard.scale.setTo(1.2, 1.2);
        this.game.add.text(80, 90, `       Wähle\n Schwierigkeit`, {
            font: "48px Arial",
            fill: "#fff",
            algin: "center"
        });
    }

    update() {}

    goNormal() {
        localStorage.setItem('difficulty', 'normal')
        this.state.start('game')
    }

    goHard() {
        localStorage.setItem('difficulty', 'hard');
        this.state.start('game')
    }
}
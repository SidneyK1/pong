export default class Controls {

    preload() {
        this.game.load.image('BG', './assets/background2.jpg');
        this.load.spritesheet('back', './assets/button_zuruck.png', 108, 40);
        this.game.load.image('phone', './assets/phone.png');
        this.game.load.image('Roger', './assets/roger3.png');
        this.game.load.image('Finger', './assets/finger2.png');
    };

    create() {
        this.add.image(0, 0, 'BG');
        this.add.image(this.world.centerX - 320, 250, 'Roger');
        this.add.image(10, 250, 'phone');
        const finger = this.add.image(80, 450, 'Finger');
        this.add.button(this.world.centerX - 150, 660, 'back', this.goBack, this, 2, 1, 0);
        const text = this.game.add.text(this.world.centerX - 170, this.world.height - 730, 'Tippe oder benutze A/D\n   und die Pfeiltasten', {
            font: "64px Arial",
            fill: "#EC0909",
            algin: "center"
        });
        text.scale.setTo(0.5, 0.5);
        finger.scale.setTo(0.4, 0.4);
    }

    update() {}

    goBack() {
        this.state.start('welcome')
    }
}   
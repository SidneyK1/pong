export default class PongGame {

    preload() {
        this.game.load.image('paddle', './assets/paddle.png');
        this.game.load.image('tennisball', './assets/tennisball.png');
        this.game.load.image('Court', './assets/background2.jpg');
        this.game.load.spritesheet('startButton', './assets/play-button.png');
        this.game.load.spritesheet('specialItem', './assets/specialItem.png');
    }

    createPlayer(x,y) {
        const player = this.game.add.sprite(x, y, 'paddle');
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.immovable = true;
        if (this.difficulty === 'hard') {
            player.scale.setTo(0.30, 0.30);
        } else {
            player.scale.setTo(0.35, 0.35); // normal
        }

        return player;
    }

    createBall(x, y) {
        const ball = this.game.add.sprite(x, y, 'tennisball');
        ball.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1, 1);
        ball.scale.setTo(0.2, 0.2);

        return ball;
    }


    launchBall() {
        this.ball.body.velocity.x = -this.ballVelocity;
        this.ball.body.velocity.y = this.ballVelocity;
        this.ballLaunched = true;
        this.playButton.pendingDestroy = true;
    }


    create() {
        // By default Phaser starts with two pointers, but we need to support four for multiplayer
        this.game.input.addPointer();
        this.game.input.addPointer();

        this.difficulty = localStorage.getItem('difficulty');
        this.add.image(0, 0, 'Court')
        this.multiplayer = parseInt(localStorage.getItem('pongMultiplayer'));
        this.ballLaunched = false;
        if (this.difficulty === 'hard') {
            this.ballVelocity = 600;
        } else {
            this.ballVelocity = 500; // normal
        }

        this.player1 = this.createPlayer(this.game.world.centerX, this.game.world.height);
        this.player2 = this.createPlayer(this.game.world.centerX, 0);
        this.ball = this.createBall(this.game.world.centerX, this.game.world.centerY);

        this.playButton = this.add.button(this.world.centerX - 40, this.world.centerY - 40, 'startButton', this.launchBall, this, 2, 1, 0);

        this.player1Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        };

        this.player2Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        };

        this.player1ScoreText = this.game.add.text(35, this.game.world.height - 390, '0', {
            font: "64px Arial",
            fill: "#EC0909",
            algin: "center"
        }); 
        
        this.player2ScoreText = this.game.add.text(35, 275, '0', {
            font: "64px Arial",
            fill: "#EC0909",
            algin: "center"
        });
        
        this.player2ScoreText.scale.setTo(1.5, 1.5);
        this.player1ScoreText.scale.setTo(1.5, 1.5);

        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
    }

    isTouchInputActive() {
        return this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown
            || this.game.input.pointer2.isDown || this.game.input.pointer3.isDown || this.game.input.pointer4.isDown;
    }

    movePlayerByTouch() {
        const touchedPlayer = !this.multiplayer || this.game.input.y > this.game.world.centerY ? this.player1 : this.player2;
        if (this.game.input.x < this.game.world.centerX) {
            touchedPlayer.body.velocity.x = -500;
        } else {
            touchedPlayer.body.velocity.x = 500;
        }
    }

    movePlayerByKeyboard(player) {
        const controls = player === this.player1 ? this.player1Controls : this.player2Controls;
        if (controls.left.isDown) {
            player.body.velocity.x = -400;
        } else if (controls.right.isDown) {
            player.body.velocity.x = 400;
        } else {
            player.body.velocity.x = 0;
        }
    }

    addSpecialItemByChance() {
        const number = this.game.rnd.integerInRange(0, 10000000);
        if ((!this.specialItem || !this.specialItem.visible) && number % 7 === 0 && number % 3 === 0 && number % 13 === 0) {
            
            this.specialItem = this.game.add.sprite(
                this.game.rnd.integerInRange(42, 451), // coordinate range inside blue tennis field
                this.game.rnd.integerInRange(45, 787),
                'specialItem'
            );
            this.specialItem.scale.setTo(0.06, 0.06)
            this.game.physics.arcade.enable(this.specialItem);
        }
    }

    update() {
        if (this.ballLaunched) {
            if (this.isTouchInputActive()) {
                this.movePlayerByTouch();
            } else {
                this.movePlayerByKeyboard(this.player1);
                if (this.multiplayer) {
                    this.movePlayerByKeyboard(this.player2);
                }
            }
        }
        
        this.game.physics.arcade.collide(this.player1, this.ball);
        this.game.physics.arcade.collide(this.player2, this.ball);

        if (this.ball.body.blocked.down) {
            this.scorePlayer2 += 1;
        } else if (this.ball.body.blocked.up) {
            this.scorePlayer1 += 1;
        }
        this.checkGameOver();

        // enemy AI
        if (!this.multiplayer) {
            this.player2.body.velocity.setTo(this.ball.body.velocity.x);
            this.player2.body.velocity.y = 0;
            this.player2.body.maxVelocity.x = 250;
        }

        this.player1ScoreText.text = this.scorePlayer1;
        this.player2ScoreText.text = this.scorePlayer2;

        const itemsEnabled = parseInt(localStorage.getItem('itemsEnabled'));
        if (itemsEnabled && this.ballLaunched) {
            this.addSpecialItemByChance();
            if (this.specialItem) {
                this.game.physics.arcade.overlap(
                    this.ball,
                    this.specialItem,
                    this.handleSpecialItemOverlap.bind(this)
                )
            }
        }
    }

    handleSpecialItemOverlap() {
        const currentVelocity = this.ball.body.velocity;
        this.ball.body.velocity.setTo(
            currentVelocity.x > 0 ? currentVelocity.x + 200 : currentVelocity.x - 200, 
            currentVelocity.y > 0 ? currentVelocity.y + 200 : currentVelocity.y - 200
        );
        this.specialItem.pendingDestroy = true;
        this.game.time.events.add(
            Phaser.Timer.SECOND * 2.5,
            () => {
                const currentVelocity = this.ball.body.velocity;
                this.ball.body.velocity.setTo(
                    currentVelocity.x > 0 ? currentVelocity.x - 200 : currentVelocity.x + 200, 
                    currentVelocity.y > 0 ? currentVelocity.y - 200 : currentVelocity.y + 200
                );
            },
            this
        );
    }

    checkGameOver() {
        if (this.scorePlayer1 === 6) {
            localStorage.setItem('winner', 'Spieler 1');
            this.game.state.start('gameover');
        }
        if (this.scorePlayer2 === 6) {
            localStorage.setItem('winner', 'Spieler 2');
            this.game.state.start('gameover');
        }
    }

}
  
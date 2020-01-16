export default class PongGame {

    preload() {
        this.game.load.image('paddle', './assets/paddle.png');
        this.game.load.image('tennisball', './assets/tennisball.png');
        this.game.load.image('Court', './assets/background2.jpg');
        this.game.load.spritesheet('startButton', './assets/play-button.png');
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
        if (this.ballLaunched) {
            this.ball.x = this.game.world.centerX;
            this.ball.y = this.game.world.centerY;
            this.ball.body.velocity.setTo(0, 0);
            this.ball_launched = false; 
        } else {
            this.ball.body.velocity.x = -this.ballVelocity;
            this.ball.body.velocity.y = this.ballVelocity;
            this.ballLaunched = true;
            this.playButton.pendingDestroy = true;
        }
    }


    create() {
        this.add.image(0, 0, 'Court')
        this.multiplayer = parseInt(localStorage.getItem('pongMultiplayer'));
        this.ballLaunched = false;
        if (this.difficulty === 'hard') {
            this.ballVelocity = 600;
        } else {
            this.ballVelocity = 500; // normal
        }

        this.player1 = this.createPlayer(this.game.world.centerX, 0);
        this.player2 = this.createPlayer(this.game.world.centerX, this.game.world.height);
        this.ball = this.createBall(this.game.world.centerX, this.game.world.centerY);

        this.playButton = this.add.button(this.world.centerX - 40, this.world.centerY - 40, 'startButton', this.launchBall, this, 2, 1, 0);

        this.player1Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        this.player2Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        };

        this.player1ScoreText = this.game.add.text(35, 275, '0', {
            font: "64px Arial",
            fill: "#EC0909",
            algin: "center"
        }); 

        this.player2ScoreText = this.game.add.text(35, this.game.world.height - 390, '0', {
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
        if (this.game.input.mousePointer.isDown) {
            return this.game.input.mousePointer;
        } else if (this.game.input.pointer1.isDown) {
            return this.game.input.pointer1;
        }
        return false;
    }

    movePlayerByTouch() {
        const touchedPlayer = !this.multiplayer || this.game.input.y < this.game.world.centerY ? this.player1 : this.player2;
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

        if (this.ball.body.blocked.up) {
            this.scorePlayer2 += 1;
        } else if (this.ball.body.blocked.down) {
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
  
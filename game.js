export default class PongGame {

    preload() {
        this.game.load.image('paddle', './assets/paddle.png')
        this.game.load.image('tennisball', './assets/tennisball.png')
        this.game.load.image('Court', './assets/background2.jpg')
    }

    createPlayer(x,y) {
        const player = this.game.add.sprite(x, y, 'paddle');
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.immovable = true;
        player.scale.setTo(0.4, 0.4);

        return player;
    }

    createBall(x, y) {
        const ball = this.game.add.sprite(x, y, 'tennisball');
        ball.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1, 1);
        ball.scale.setTo(0.20, 0.20);

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
        }
    }


    create() {
        this.add.image(0, 0, 'Court')
        this.multiplayer = parseInt(localStorage.getItem('pongMultiplayer'));
        console.log('just read multiplayer', this.multiplayer);
        this.ballLaunched = false;
        this.ballVelocity = 400;

        this.player1 = this.createPlayer(this.game.world.centerX, 0);
        this.player2 = this.createPlayer(this.game.world.centerX, this.game.world.height);
        this.ball = this.createBall(this.game.world.centerX, this.game.world.centerY);

        this.game.input.onDown.add(this.launchBall, this);

        this.player1Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        };

        this.player2Controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        };

        this.player1ScoreText = this.game.add.text(90, 270, '0', {
            font: "64px Gabriella",
            fill: "#ffffff",
            algin: "center"
        }); 

        this.player2ScoreText = this.game.add.text(90, this.game.world.height - 340, '0', {
            font: "64px Gabriella",
            fill: "#ffffff",
            algin: "center"
        });

        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
    }


    movePlayer(player) {
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
            this.movePlayer(this.player1);
            if (this.multiplayer) {
                this.movePlayer(this.player2);
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
        if (this.scorePlayer1 === 1) {
            localStorage.setItem('winner', 'Player 1');
            this.game.state.start('gameover');
        }
        if (this.scorePlayer2 === 1) {
            localStorage.setItem('winner', 'Player 2');
            this.game.state.start('gameover');
        }
    }

}
  
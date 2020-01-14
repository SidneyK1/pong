class PongGame {

  preload() {
    this.game.load.image('paddle', './assets/paddle.png')
    this.game.load.image('ball', './assets/ball.png')
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
    const ball = this.game.add.sprite(x, y, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
  
    return ball;
  }

  
  launchBall() {
    if (this.ballLaunched) {
        this.ball.x = game.world.centerX;
        this.ball.y = game.world.centerY;
        this.ball.body.velocity.setTo(0, 0);
        this.ball_launched = false; 
    } else {
        this.ball.body.velocity.x = -this.ballVelocity;
        this.ball.body.velocity.y = this.ballVelocity;
        this.ballLaunched = true;
    }
  }
  
  
  create() {
    this.ballLaunched = false;
    this.ballVelocity = 400;
  
    this.player1 = this.createPlayer(this.game.world.centerX, 0);
    this.player2 = this.createPlayer(this.game.world.centerX, this.game.world.height);
    this.ball = this.createBall(this.game.world.centerX, this.game.world.centerY);
  
    this.game.input.onDown.add(this.launchBall, this);
  
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

  
  movePlayer(player, x) {
    player.x = x;
  
    if (player.x < player.width / 2) {
        player.x = player.width / 2;
    } else if (player.x > game.world.width - player.width / 2) {
        player.x = game.world.width - player.width / 2;
    }
  }
  
  update() {
    if (this.ballLaunched) {
      this.movePlayer(this.player1, this.game.input.x);
    }
    
    this.game.physics.arcade.collide(this.player1, this.ball);
    this.game.physics.arcade.collide(this.player2, this.ball);
  
    if (this.ball.body.blocked.up) {
      this.scorePlayer2 += 1;
    } else if (this.ball.body.blocked.down) {
      this.scorePlayer1 += 1;
    }
  
    // enemy AI
    this.player2.body.velocity.setTo(this.ball.body.velocity.x);
    this.player2.body.velocity.y = 0;
    this.player2.body.maxVelocity.x = 250;
     
  
    this.player1ScoreText.text = this.scorePlayer1;
    this.player2ScoreText.text = this.scorePlayer2;
  }

}

const game = new Phaser.Game(
  500,
  700,
  Phaser.AUTO,
  ''
);

game.state.add('Pong', PongGame);
game.state.start('Pong');
var game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  '',
  {
      preload: preload, 
      create: create,
      update: update
  }
);
var paddle1;
var paddle2;

var ball_launched;
var ball_velocity;
var ball;

var score1_text;
var score2_text;

var score1;
var score2;


function preload() {
  game.load.image('paddle', './assets/paddle.png')
  game.load.image('ball', './assets/ball.png')
}

function create_paddle(x,y) {
  var paddle = game.add.sprite(x, y, 'paddle');
  paddle.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(paddle);
  paddle.body.collideWorldBounds = true;
  paddle.body.immoveable = true;
  paddle.scale.setTo(0.5, 0.5);


  return paddle;
}

function create_ball(x, y) {
  var ball = game.add.sprite(x, y, 'ball');
  ball.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(ball);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.setTo(1, 1);

  return ball;
}

function launch_ball() {
  if (ball_launched) {
      ball.x = game.world.centerX;
      ball.y = game.world.centerY;
      ball.body.velocity.setTo(0, 0);
      ball_launched = false; 
  } else {
      ball.body.velocity.x = -ball_velocity;
      ball.body.velocity.y = ball_velocity;
      ball_launched = true;
  }
}

function create() {
  ball_launched = false;
  ball_velocity = 400;

  paddle1 = create_paddle(0, game.world.CenterY);
  paddle2 = create_paddle(game.world.width - 8, game.world.CenterY);
  ball = create_ball(game.world.centerX, game.world.centerY);

  game.input.onDown.add(launch_ball, this);

  score1_text = game.add.text(128, 128, '0', {
      font: "64px Gabriella",
      fill: "#ffffff",
      algin: "center"
  }); 

  score2_text = game.add.text(game.world.width - 128, 128, '0', {
      font: "64px Gabriella",
      fill: "#ffffff",
      algin: "center"
  });

  score1 = 0;
  score2 = 0;


}

function control_paddle(paddle, y) {
  paddle.y = y;

  if (paddle.y < paddle.height / 2) {
      paddle.y = paddle.height / 2;
  } else if (paddle.y > game.world.height - paddle.height / 2) {
      paddle.y = game.world.height - paddle.height / 2;
  }
}

function update() {
  control_paddle(paddle1, game.input.y);
  game.physics.arcade.collide(paddle1,ball);
  game.physics.arcade.collide(paddle2,ball);

  if (ball.body.blocked.left) {
      score2 += 1;
  } else if (ball.body.blocked.right) {
      score1 += 1;
  }

  paddle2.body.velocity.setTo(ball.body.velocity.y);
  paddle2.body.velocity.x = 0;
  paddle2.body.maxVelocity.y = 250; 

  score1_text.text = score1;
  score2_text.text = score2;
}
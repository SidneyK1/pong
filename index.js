import PongGame from './game.js'
import Welcome from './welcome.js'
import GameOver from './gameOver.js'
import Controls from './controls.js'

const game = new Phaser.Game(
  500,
  830,
  Phaser.AUTO,
  'pong'
);
game.state.add('welcome', Welcome);
game.state.add('game', PongGame);
game.state.add('gameover', GameOver);
game.state.add('controls', Controls);
game.state.start('welcome'); 
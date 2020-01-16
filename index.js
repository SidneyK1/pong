import PongGame from './game.js'
import Welcome from './welcome.js'
import GameOver from './gameOver.js'
import Controls from './controls.js'
import ChooseDifficulty from './chooseDifficulty.js'

const game = new Phaser.Game({
  height: 830,
  width: 500,
  renderer: Phaser.CANVAS,
  scaleMode: Phaser.ScaleManager.SHOW_ALL,
  parent: 'container',
  alignH: true,
  alignV: true
});

game.state.add('welcome', Welcome);
game.state.add('game', PongGame);
game.state.add('gameover', GameOver);
game.state.add('controls', Controls);
game.state.add('chooseDifficulty', ChooseDifficulty);
game.state.start('welcome'); 
var ArrowKeys = function(game)
{
    //console.log("CLASS ArrowKeys - Add Arrow Keys");
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    this.select1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.select2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.select3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
}
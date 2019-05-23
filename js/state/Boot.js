//JQuery listener document ready

var SPRITESIZE = 32;
var HEIGHT = 18;
var WIDTH = 20;

$(function(){
    
    //console.log("STATE Boot - Launch Game");
    
    var game = new Phaser.Game(WIDTH * SPRITESIZE, HEIGHT * SPRITESIZE, Phaser.AUTO, 'game-container');
    
    game.state.add("Preloader", Preloader);
    game.state.add("MainMenu", MainMenu);
    game.state.add("LevelProto", LevelProto);
    
    //start state
    game.state.start("Preloader");
    
});
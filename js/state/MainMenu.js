var MainMenu = {
    
   
    /********************************
        ENGINE
    *********************************/
    
    
    create:function()
    {

    },
    
    addKeyboardListeners:function()
    {
        var enterKeyListener = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKeyListener.onDown.add(this.startGame, this);
    },
    
    startGame:function()
    {
        console.log("TEST ENTER KEY DOWN");
        this.game.state.start("LevelProto");
    }
}
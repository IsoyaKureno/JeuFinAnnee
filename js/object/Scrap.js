///////////
//       //
// SCRAP //
//       //
///////////

var Scrap = function(game)
{
    this.currentState = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, 0*SPRITESIZE, 0*SPRITESIZE, 'sp-scrap');
    
    this.nGravity = 200;
    
    //Scrap value
    this.nValue = 50;
    
    this.init(game);
}

Scrap.prototype = Object.create(Phaser.Sprite.prototype);
Scrap.prototype.constructor = Scrap;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Scrap.prototype.init = function(game)
{
    //console.log("OBJECT Scrap - Init Scrap");
    
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = this.nGravity;
    
    this.alpha = 0;
}

////////////
//        //
// UPDATE //
//        //
////////////

Scrap.prototype.update = function()
{
    this.currentState.game.physics.arcade.collide(this, this.currentState._Platforms);
}

///////////
//       //
// SPAWN //
//       //
///////////

Scrap.prototype.spawn = function(posX, posY)
{
    //console.log("OBJECT Scrap - Scrap Spawn");
    
    this.alpha = 1;
    
    //to the foe's position
    this.body.x = posX;
    this.body.y = posY;
    
    this.currentState.updateNextScrapId();
}

/////////////
//         //
// DESPAWN //
//         //
/////////////

Scrap.prototype.despawn = function()
{
    //console.log("OBJECT Scrap - Scrap Despawn");
    
    this.alpha = 0;
    
    this.body.x = 0;
    this.body.y = 0;
}
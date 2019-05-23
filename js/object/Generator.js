///////////////
//           //
// GENERATOR //
//           //
///////////////

var Generator = function(game, posX, posY, spritesheet)
{
    Phaser.Sprite.call(this, game, posX, posY, spritesheet);
    
    this.nbLives = 5;
    
    this.init(game);
}

Generator.prototype = Object.create(Phaser.Sprite.prototype);
Generator.prototype.constructor = Generator;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Generator.prototype.init = function(game)
{
    //console.log("OBJECT Generator - Init Generator");
    
    this.game.physics.arcade.enable(this);
    
    this.body.immovable = true;
    this.body.moves = false;
}

//////////////
//          //
// TAKE HIT //
//          //
//////////////

Generator.prototype.takeHit = function(game)
{
    if(this.nbLives > 0)
    {
        //console.log("OBJECT Generator - Generator Take Hit");

        this.nbLives--;

        console.log("Generator Life :", this.nbLives);

        if(this.nbLives == 0)
        {
            console.log("OBJECT Generator - Generator Destroyed");
        }
    }
}
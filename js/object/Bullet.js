////////////
//        //
// BULLET //
//        //
////////////

var Bullet = function (game, posX, posY) {
    this.currentState = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, 0*SPRITESIZE, 0*SPRITESIZE, 'sp-bullet', 0);
    
    this.posTurretX = posX;
    this.posTurretY = posY;
    
    this.nVelocity = 500;
    this.nDamage = 3;
    
    this.bIsShot = false;
    this.nDir = 0;
    
    this.init();
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Bullet.prototype.init = function()
{
    //console.log("OBJECT Bullet - Init Bullet");
    
    this.game.physics.arcade.enable(this);
    
    this.alpha = 0;
}

////////////
//        //
// UPDATE //
//        //
////////////

Bullet.prototype.update = function()
{
    //console.log("OBJECT Bullet - Update Bullet");
    
    this.currentState.game.physics.arcade.collide(this, this.currentState._Platforms, this.reload, null, this);
    
    if(this.bIsShot && this.nDir != 0)
    {
        this.move();
    }
}

//////////
//      //
// MOVE //
//      //
//////////

Bullet.prototype.move = function()
{
    //console.log("OBJECT Bullet - Move Bullet");
    this.body.velocity.x = this.nVelocity * this.nDir;
}

///////////
//       //
// SHOOT //
//       //
///////////

Bullet.prototype.shoot = function(sDirection)
{
    //console.log("OBJECT Bullet - Shoot Bullet");
    
    if(this.nDir == 0)
    {
		if(sDirection == 'left')
			this.nDir = -1;

		if(sDirection == 'right')
			this.nDir = 1;
		
		if(this.nDir != 0)
		{
			this.bIsShot = true;

			this.body.position.x = this.posTurretX;
			this.body.position.y = this.posTurretY;
			this.alpha = 1;
		}
	}
}

////////////
//        //
// RELOAD //
//        //
////////////

Bullet.prototype.reload = function()
{
    //console.log("OBJECT Bullet - Reset Bullet");
    
    this.nDir = 0;
    this.bIsShot = false;
    
    this.alpha = 0;
    this.body.position.x = 0;
    this.body.position.y = 0;
}
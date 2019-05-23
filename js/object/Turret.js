////////////
//        //
// TURRET //
//        //
////////////

var Turret = function(game, posX, posY, nType)
{
    this.currentState = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, posX, posY, 'sp-turret-v2', 0);
    
    this.leftVisualField = this.addChild(this.game.make.sprite(-2*SPRITESIZE, SPRITESIZE, 'sp-visualField'));
    this.rightVisualField = this.addChild(this.game.make.sprite(1*SPRITESIZE, SPRITESIZE, 'sp-visualField'));
    
    this.bIsActive = false;
    this.bIsOnUse = false;
    
    //to know what the player choose on the menu//
    this.turretChoosed = -1;
    
    //number or frames between each shoot//
    this.fireRate = 300;
    
    //shoot cooldown//
    this.nextFire = 0;
    
    this.nbBullets = 10; //10
    this._TurretBullets = this.game.add.group();
    
    //the indice of the next bullet in the group to shoot//
    this.nNextBullet = 0;
    
    
    this.init(game);
}

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Turret.prototype.init = function(game)
{
    //console.log("OBJECT Turret - Init Turret");
    
    this.game.physics.arcade.enable(this);
    
    this.body.immovable = true;
    this.body.moves = false;
	
	this.anchor.set(0, -1);		//to correspond with tile file
    
    this.game.physics.arcade.enable(this.leftVisualField);
    this.game.physics.arcade.enable(this.rightVisualField);
    
    this.leftVisualField.alpha = 0;
    this.rightVisualField.alpha = 0;
    
    //create all bullets//
    var newBullet;
    for(var iBullet = 0; iBullet < this.nbBullets; iBullet++)
    {
        newBullet = new Bullet(game, this.body.position.x + SPRITESIZE/4, this.body.position.y + SPRITESIZE/4);
        this.currentState.add.existing(newBullet);
        this._TurretBullets.children[iBullet] = newBullet;
    }
}

////////////
//        //
// UPDATE //
//        //
////////////

Turret.prototype.update = function()
{
    //console.log("OBJECT Turret - Update Turret");
    
    //CREATE TURRET//
    this.game.physics.arcade.overlap(this, this.currentState.player, this.playerIsOnTurret, null, this);
    
    if(this.bIsOnUse)
    {
        this.playerIsChoosing();
    }
    /////////////////
    
    //SHOOT//
    if(this.bIsActive)
    {
        this.game.physics.arcade.overlap(this.leftVisualField, this.currentState._Foes, this.shootLeft, null, this);
        this.game.physics.arcade.overlap(this.rightVisualField, this.currentState._Foes, this.shootRight, null, this);
    }
    /////////
	
	//A bullet collide with a foe//
	this.game.physics.arcade.overlap(this._TurretBullets, this.currentState._Foes, this.targetHit, null, this);
	///////////////////////////////
}

/////////////////////////
//                     //
// PLAYER IS ON TURRET //
//                     //
/////////////////////////

Turret.prototype.playerIsOnTurret = function()
{
    //console.log("OBJECT Turret - Player Is On Turret");
    
    if(this.currentState.player.cursors.down.isDown && !this.currentState.player.bIsMoving && this.currentState.player.bIsFree && !this.currentState.player.bHasAction)
    {
        this.bIsOnUse = true;
        this.currentState.player.bIsFree = false;
        this.currentState.player.bHasAction = true;
        this.currentState.player.changeAlphaChoiceFrames(1);
    }
}

////////////////////////
//                    //
// PLAYER IS CHOOSING //
//                    //
////////////////////////

Turret.prototype.playerIsChoosing = function()
{
    //THE PLAYER CHOOSE A TURRET//
    if(this.currentState.player.cursors.down.isDown && !this.currentState.player.bHasAction)
    {
        this.currentState.player.changeChoiceFrames(1, 2, 3, 1);
        this.turretChoosed = 0;
        this.currentState.player.bIsChoosing = true;
    }
    else if(this.currentState.player.cursors.select1.isDown)
    {
        this.currentState.player.changeChoiceFrames(5, 2, 3, 0);
        this.turretChoosed = 1;
        this.currentState.player.bIsChoosing = true;
    }
    else if(this.currentState.player.cursors.select2.isDown)
    {
        this.currentState.player.changeChoiceFrames(1, 6, 3, 0);
        this.turretChoosed = 2;
        this.currentState.player.bIsChoosing = true;
    }
    else if(this.currentState.player.cursors.select3.isDown)
    {
        this.currentState.player.changeChoiceFrames(1, 2, 7, 0);
        this.turretChoosed = 3;
        this.currentState.player.bIsChoosing = true;
    }
    else
    {
        this.currentState.player.bIsChoosing = false;
    }
    //////////////////////////////
    
    //THE PLAYER BUILD A TURRET//
    if(this.turretChoosed != -1 && !this.currentState.player.bIsChoosing)
    {
        if(this.turretChoosed > 0)
        {
            //CREATE TURRET//
            //TODO animate visual field//
            this.frame = 1;
            this.bIsActive = true;
            
            this.leftVisualField.alpha = 1;
            this.rightVisualField.alpha = 1;
            /////////////////
        }
        else
        {
            //SELL or CANCEL TURRET//
            this.frame = 0;
            this.bIsActive = false;
            
            this.leftVisualField.alpha = 0;
            this.rightVisualField.alpha = 0;
            /////////////////////////
        }
            
        //console.log("this.bIsActive :", this.bIsActive);
        
        this.bIsOnUse = false;
        
        this.currentState.player.bIsFree = true;

        this.currentState.player.changeAlphaChoiceFrames(0);
        this.currentState.player.changeChoiceFrames(1, 2, 3, 0);
        this.turretChoosed = -1;
    }
    /////////////////////////////
}

//////////////////////////
//                      //
// SHOOT LEFT AND RIGHT //
//                      //
//////////////////////////

Turret.prototype.shootLeft = function()
{
    this.shoot('left');
}

Turret.prototype.shootRight = function()
{
    this.shoot('right');
}

///////////
//       //
// SHOOT //
//       //
///////////

Turret.prototype.shoot = function(sDirection)
{    
    //console.log("OBJECT Turret - Turret Shoot");
    
    if(this.currentState.game.time.now > this.nextFire)
    {
        this.nextFire = this.currentState.game.time.now + this.fireRate;
        
        this._TurretBullets.children[this.nNextBullet].reload();
        this._TurretBullets.children[this.nNextBullet].shoot(sDirection);
        
        if(sDirection == 'left')
        {
            this.frame = 1;
        }
        else if(sDirection == 'right')
        {
            this.frame = 2;
        }
        
        this.nNextBullet = (this.nNextBullet + 1) % this.nbBullets;
    }
}

////////////////////
//                //
// BULLET HIT FOE //
//                //
////////////////////

Turret.prototype.targetHit = function(bullet, foe)
{
	//console.log("OBJECT Turret - Foe Collide with Bullet");
	
	if(bullet.bIsShot)
	{
		foe.takeHit();
		bullet.reload();
	}
}


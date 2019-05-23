////////////
//        //
// PLAYER //
//        //
////////////

var Player = function(game, posX, posY, keys)
{
    this.currentState = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, posX, posY, 'sp-perso');
    
    this.cursors = keys;
    
    this.nVelocity = 250;
    this.nJumpPower = 600;
    this.nGravity = 1000;
    
    //player's armor points
    this.nArmor = 4;
    
    //player's scraps
    this.nScraps = 0;
    
    //to block the jump holding//
    this.bHasJump = false;
    
    //to not create a turret while moving//
    this.bIsMoving = false;
    
    //to block the down key when the menu open//
    this.bHasAction = false;
    
    //to block the player when he's choosing a turret//
    this.bIsFree = true;
    
    //to know if a select key is holding//
    this.bIsChoosing = false;
    
    //to know if the player is hit or dead
    this.sState = "OK";     //"OK" or "INVINCIBLE" or "DEAD"
    
    //time in frame of the invincibility
    this.nInvincibleDuration = 80;
    
    //invincibility timer
    this.nInvincibleTimer = 0;
    
    
    this.init();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Player.prototype.init = function()
{
    //console.log("OBJECT Player - Init Player");
    
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = this.nGravity;
    
    this.selector0 = this.addChild(this.game.make.sprite(-SPRITESIZE*1.5, -SPRITESIZE*1.5, 'sp-turret', 1));
    this.selector1 = this.addChild(this.game.make.sprite(0, -SPRITESIZE*1.5, 'sp-turret', 2));
    this.selector2 = this.addChild(this.game.make.sprite(SPRITESIZE*1.5, -SPRITESIZE*1.5, 'sp-turret', 3));
    this.selectorExit = this.addChild(this.game.make.sprite(0, SPRITESIZE*1.5, 'sp-exit', 0));
    
    this.changeAlphaChoiceFrames(0);
}

////////////
//        //
// UPDATE //
//        //
////////////

Player.prototype.update = function()
{
    //COLLIDE WITH PLATFORMS//
    this.currentState.game.physics.arcade.collide(this, this.currentState._Platforms);
    
    //PLAYER HAS ACTION//
    if(!this.cursors.down.isDown)
    {
        this.bHasAction = false;
    }
    
    //MOVE PLAYER IF IS FREE//
    if(this.bIsFree)
    {
        this.body.velocity.x = 0;
        this.move();
        
        //CHECK PLAYER IS MOVING//
        this.bIsMoving = this.body.velocity.x || this.body.velocity.y;
    }
    
    //PLAYER RECUP SCRAPS//
    this.currentState.game.physics.arcade.overlap(this, this.currentState._Scraps, this.recupScrap, null, this);
    
    //PLAYER IS HIT BY FOES//
    this.currentState.game.physics.arcade.overlap(this, this.currentState._Foes, this.isHit, null, this);
    
    //INVINCIBLE TIME//
    if(this.sState == "INVINCIBLE")
    {
        if(this.nInvincibleTimer < this.nInvincibleDuration)
        {
            //console.log("INVINCIBLE TIME !!!");
            this.nInvincibleTimer++;
            
            this.alpha = this.nInvincibleTimer % 10;
            
            if(this.nInvincibleTimer == 10)
            {
                this.bIsFree = true;
            }
        }
        else
        {
            //console.log("End of Invincible time");
            this.nInvincibleTimer = 0;
            this.alpha = 1;
            this.sState = "OK";
        }
    }
    ///////////////////
}

//////////
//      //
// MOVE //
//      //
//////////

Player.prototype.move = function()
{
    //WALK//
    if (this.cursors.left.isDown)
        this.body.velocity.x -= this.nVelocity;
    
    if (this.cursors.right.isDown)
        this.body.velocity.x += this.nVelocity;
    ////////
    
    
    //JUMP//
    if(this.body.touching.down || this.body.blocked.down)
    {
        if (this.cursors.up.isDown && !this.bHasJump)
        {
            //console.log("OBJECT Player - Player Jump");
            this.body.velocity.y = -this.nJumpPower;
            this.bHasJump = true;
        }
        
        if(this.cursors.up.isUp && this.bHasJump)
            this.bHasJump = false;
    }
    ////////
    
    
}

///////////////////////
//                   //
// CHANGE ALPHA MENU //
//                   //
///////////////////////

Player.prototype.changeAlphaChoiceFrames = function(nAlpha)
{
    this.selector0.alpha = nAlpha;
    this.selector1.alpha = nAlpha;
    this.selector2.alpha = nAlpha;
    this.selectorExit.alpha = nAlpha;
}

////////////////////////
//                    //
// CHANGE FRAMES MENU //
//                    //
////////////////////////

Player.prototype.changeChoiceFrames = function(n0, n1, n2, nExit)
{
    this.selector0.frame = n0;
    this.selector1.frame = n1;
    this.selector2.frame = n2;
    this.selectorExit.frame = nExit;
}

////////////////////////
//                    //
// PLAYER RECUP SCRAP //
//                    //
////////////////////////

Player.prototype.recupScrap = function(player, scrap)
{
    //console.log("OBJECT Player - Player Recup Scrap");
    
    this.nScraps += scrap.nValue;
    scrap.despawn();
    
    console.log("Player Scraps", this.nScraps);
}

///////////////////
//               //
// PLAYER IS HIT //
//               //
///////////////////

Player.prototype.isHit = function(player, foe)
{
    if(this.sState == "OK")
    {
        //console.log("OBJECT Player - Player is Hit");
        
        if(this.nArmor)
        {
            this.nArmor--;
            console.log("Player Armor", this.nArmor);
            
            var multiKnockback = 2;
            
            //KNOCKBACK//
            if(this.body.x < foe.body.x)
            {
                this.body.velocity.x = -this.nVelocity * multiKnockback;
            }
            else
            {
                this.body.velocity.x = this.nVelocity * multiKnockback;
            }
            /////////////
            
            this.sState = "INVINCIBLE";
            this.bIsFree = false;
        }
        else
        {
            this.die();
        }
    }
}

////////////////
//            //
// PLAYER DIE //
//            //
////////////////

Player.prototype.die = function()
{
    //console.log("OBJECT Player - Player Death");
    
    this.sState = "DEAD";
    
    this.alpha = 0;
    
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.bIsFree = false;
    
    //to the generator's position
    this.body.x = 9.5*SPRITESIZE;
    this.body.y = 16*SPRITESIZE;
    
    console.log("Player Die");
}
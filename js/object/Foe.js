/////////
//     //
// FOE //
//     //
/////////

var Foe = function(game, posX, posY)
{
    this.currentState = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, posX, posY, 'sp-foe');
    
    this.nVelocity = 50;   //50
    this.nGravity = 300;
	
	this.nMaxLife = SPRITESIZE/2;
    this.nLife = this.nMaxLife;
	
	this.maxLifeBar = this.addChild(this.game.make.sprite(0, -SPRITESIZE/4, 'sp-lifebar', 0));
	this.actualLifeBar = this.addChild(this.game.make.sprite(0, -SPRITESIZE/4, 'sp-lifebar', 1));;
    
    this.init();
}

Foe.prototype = Object.create(Phaser.Sprite.prototype);
Foe.prototype.constructor = Foe;

////////////////////
//                //
// INITIALISATION //
//                //
////////////////////

Foe.prototype.init = function()
{
    //console.log("OBJECT Foe - Init Foe");
    
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = this.nGravity;
	
	if(this.position.x > WIDTH * SPRITESIZE / 2)
		this.nVelocity *= -1;
	
	this.maxLifeBar.alpha = 0;
	this.actualLifeBar.alpha = 0;
}

////////////
//        //
// UPDATE //
//        //
////////////

Foe.prototype.update = function()
{
    this.currentState.game.physics.arcade.collide(this, this.currentState._Platforms);
    
    this.currentState.game.physics.arcade.collide(this, this.currentState.generator, function () {
        this.currentState.generator.takeHit();
        this.kill();
    }, null, this);
    
    this.move();
}

//////////
//      //
// MOVE //
//      //
//////////

Foe.prototype.move = function()
{
    //console.log("OBJECT Foe - Move Foe");
    this.body.velocity.x = 0;
    
    if(this.body.blocked.left || this.body.blocked.right)
    {
        //console.log("OBJECT Foe - Change Direction");
        this.nVelocity *= -1;
    }
    
    if(this.body.blocked.down)
    {
        this.body.velocity.x = this.nVelocity;
    }
}

//////////////
//          //
// TAKE HIT //
//          //
//////////////

Foe.prototype.takeHit = function()
{
    if(this.nLife > 0)
    {
        //console.log("OBJECT Foe - Foe Take Hit");
		if(this.nLife == this.nMaxLife)
		{
			this.maxLifeBar.alpha = 1;
			this.actualLifeBar.alpha = 1;
		}

        this.nLife--;

        //console.log("OBJECT Foe - Foe Life :", this.nLife);
		
		this.actualLifeBar.width -= 2;

        if(this.nLife == 0)
        {
            //console.log("OBJECT Foe - Foe Killed");
            this.die();
        }
    }
}

/////////
//     //
// DIE //
//     //
/////////

Foe.prototype.die = function()
{
    //loot scraps//
    //TODO more scraps with dynamic spawn//
    this.currentState._Scraps.children[this.currentState.nNextScrapId].spawn(this.body.x+10, this.body.y);
    this.currentState._Scraps.children[this.currentState.nNextScrapId].spawn(this.body.x-10, this.body.y);
    this.currentState._Scraps.children[this.currentState.nNextScrapId].spawn(this.body.x, this.body.y);
    
    this.kill();
}
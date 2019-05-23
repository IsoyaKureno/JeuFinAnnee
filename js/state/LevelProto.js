var LevelProto = {
   
    /********************************
        ENGINE
    *********************************/
    
    ////////////
    //        //
    // CREATE //
    //        //
    ////////////
    
    create:function()
    {
        //console.log("STATE LevelProto - Create");
        
        this.stage.backgroundColor = "#5991ff";
        
        this.initMap();
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
/////////////////////////////////////////////////////////////////////////
        //TEST//
        if(1)
        {
            var testTurretId = 5;
            this._Turrets.children[testTurretId].turretChoosed = 1;
            this._Turrets.children[testTurretId].frame = this._Turrets.children[testTurretId].turretChoosed;
            this._Turrets.children[testTurretId].bIsActive = true;
            this._Turrets.children[testTurretId].leftVisualField.alpha = 1;
            this._Turrets.children[testTurretId].rightVisualField.alpha = 1;
            
            var testTurretId = 4;
            this._Turrets.children[testTurretId].turretChoosed = 1;
            this._Turrets.children[testTurretId].frame = this._Turrets.children[testTurretId].turretChoosed;
            this._Turrets.children[testTurretId].bIsActive = true;
            this._Turrets.children[testTurretId].leftVisualField.alpha = 1;
            this._Turrets.children[testTurretId].rightVisualField.alpha = 1;
            
            var testTurretId = 3;
            this._Turrets.children[testTurretId].turretChoosed = 1;
            this._Turrets.children[testTurretId].frame = this._Turrets.children[testTurretId].turretChoosed;
            this._Turrets.children[testTurretId].bIsActive = true;
            this._Turrets.children[testTurretId].leftVisualField.alpha = 1;
            this._Turrets.children[testTurretId].rightVisualField.alpha = 1;
            
            var testTurretId = 2;
            this._Turrets.children[testTurretId].turretChoosed = 1;
            this._Turrets.children[testTurretId].frame = this._Turrets.children[testTurretId].turretChoosed;
            this._Turrets.children[testTurretId].bIsActive = true;
            this._Turrets.children[testTurretId].leftVisualField.alpha = 1;
            this._Turrets.children[testTurretId].rightVisualField.alpha = 1;
        }
//////////////////////////////////////////////////////////////////////////////
    },
    
    //////////////
    //          //
    // INIT MAP //
    //          //
    //////////////
    
    initMap:function()
    {
        //console.log("STATE LevelProto - Init Map");
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset-mario', 'tileset1');
        
        
        
        //console.log("STATE LevelProto - Init Walls");
        this._Platforms = this.map.createLayer('Walls');
        this.map.setCollisionByExclusion([0], true, this._Platforms);
        
        
        
        //console.log("STATE LevelProto - Init Generator");
        this.generator = new Generator(this.game, 9*SPRITESIZE, 15*SPRITESIZE, 'sp-generator');
        this.add.existing(this.generator);
        
        
        
        //console.log("STATE LevelProto - Init Turrets");
        this._Turrets = this.game.add.group();
        this.map.createFromObjects("Turrets", "turret", null, null, true, false, this._Turrets, Turret);
        

        
        //console.log("STATE LevelProto - Init Foes");
        this._Foes = this.game.add.group();
        //this.map.createFromObjects("Foes", "TestFoe", null, null, true, false, this._Foes, Foe);
        
        this._Waves = new Array();
        this.nActualWave = 0;
        console.log("nActualWave", this.nActualWave + 1);
        this.nTimerBetweenFoes = 0;
        this.nFrameBetweenFoes = 100;
        this.nTimerBetweenWaves = 0;
        this.nFrameBetweenWaves = 700;
        var _spawn;
        
        //WAVE 1//
        var _Wave1 = new Array();
        _spawn = new Array(1,0,0,0);
        _Wave1.push(_spawn);
        _spawn = new Array(0,0,1,0);
        _Wave1.push(_spawn);
        _spawn = new Array(0,1,0,0);
        _Wave1.push(_spawn);
        _spawn = new Array(0,0,0,1);
        _Wave1.push(_spawn);
        //////////
        
        //WAVE 2//
        var _Wave2 = new Array();
        _spawn = new Array(0,1,0,1);
        _Wave2.push(_spawn);
        _spawn = new Array(1,0,1,0);
        _Wave2.push(_spawn);
        _spawn = new Array(0,1,0,1);
        _Wave2.push(_spawn);
        _spawn = new Array(1,0,1,0);
        _Wave2.push(_spawn);
        //////////
        
        //WAVE 3//
        var _Wave3 = new Array();
        _spawn = new Array(0,1,0,0,1,0,0,1);
        _Wave3.push(_spawn);
        _spawn = new Array(1,0,0,1,0,0,1,0);
        _Wave3.push(_spawn);
        _spawn = new Array(1,0,0,1,0,0,1,0);
        _Wave3.push(_spawn);
        _spawn = new Array(0,1,0,0,1,0,0,1);
        _Wave3.push(_spawn);
        //////////
        
        this._Waves.push(_Wave1);
        this._Waves.push(_Wave2);
        this._Waves.push(_Wave3);
        
        
        
        //console.log("STATE LevelProto - Init Scraps");
        this.nNbScraps = 5;
        this.nNextScrapId = 0;
        
        this._Scraps = this.game.add.group();
        for(var i = 0; i < this.nNbScraps; i++)
        {
            this._Scraps.add(new Scrap(this.game));
        }
        
        
        
        //console.log("STATE LevelProto - Init Player");
        var keys_player = new ArrowKeys(this.game);
        this.player = new Player(this.game, 7*SPRITESIZE, 16*SPRITESIZE, keys_player);
        this.add.existing(this.player);
    },
    
    ////////////
    //        //
    // UPDATE //
    //        //
    ////////////
    
    update:function()
    {
        //end of the wave spawn
        if(this.nTimerBetweenFoes/this.nFrameBetweenFoes == this._Waves[this.nActualWave][0].length && this.nTimerBetweenWaves < this.nFrameBetweenWaves)
        {
            this.nTimerBetweenWaves++;
            console.log("Waiting for next wave");
        }
        else
        {
            this.nTimerBetweenFoes++;
        }   
        
        //change wave
        if(this.nTimerBetweenWaves == this.nFrameBetweenWaves)
        {
            this.nActualWave = (this.nActualWave+1) %3;
            console.log("nActualWave", this.nActualWave + 1);
            
            this.nTimerBetweenFoes = 0;
            this.nTimerBetweenWaves = 0;
        }
        
        if(this.nTimerBetweenFoes % this.nFrameBetweenFoes == 0)
        {
            //spawn at first spawn
            if(this._Waves[this.nActualWave][0][this.nTimerBetweenFoes/this.nFrameBetweenFoes])
            {
                this._Foes.add(new Foe(this.game, 1.5*SPRITESIZE, 0*SPRITESIZE));
            }
            
            //spawn at second spawn
            if(this._Waves[this.nActualWave][1][this.nTimerBetweenFoes/this.nFrameBetweenFoes])
            {
                this._Foes.add(new Foe(this.game, 7.5*SPRITESIZE, 0*SPRITESIZE));
            }
            
            //spawn at third spawn
            if(this._Waves[this.nActualWave][2][this.nTimerBetweenFoes/this.nFrameBetweenFoes])
            {
                this._Foes.add(new Foe(this.game, 11.5*SPRITESIZE, 0*SPRITESIZE));
            }
            
            //spawn at fourth spawn
            if(this._Waves[this.nActualWave][3][this.nTimerBetweenFoes/this.nFrameBetweenFoes])
            {
                this._Foes.add(new Foe(this.game, 17.5*SPRITESIZE, 0*SPRITESIZE));
            }
        }
    },
    
    ////////////
    //        //
    // RENDER //
    //        //
    ////////////
    
    render:function() 
    {
        //this.game.debug.body(this.player);
        //this.game.debug.body(this.generator);
    }

}
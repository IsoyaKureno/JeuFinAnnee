var Preloader = {
    
    progressBar:null,
    
    /********************************
        ENGINE
    *********************************/
    
    init:function()
    {
        //console.log("STATE Preloader - Init");
        
        this.progressBar = this.game.add.graphics(0, 0);
        this.progressBar.beginFill(0x5991ff);
        this.progressBar.drawRect(0, 0, this.game.width, this.game.height);
        
        this.progressBar.scale.x = 0;
    },
    
    loadUpdate:function()
    {
        this.progressBar.scale.x = this.load.progress/100;  
    },
    
    preload:function()
    {
        //console.log("STATE Preloader - Preload");
        
        //HOME//
        this.load.image('home-background', 'assets/UI/home/home-background.gif');
        this.load.image('home-panel', 'assets/UI/home/home-panel.png');
        this.load.image('home-selector', 'assets/UI/home/home-selector.png');
        
        //PLAYER//
        this.load.spritesheet('sp-perso', 'assets/sp/sp-perso.png', SPRITESIZE, SPRITESIZE, 12);
        
        //SCRAPS//
        this.load.image('sp-scrap', 'assets/sp/sp-scraps.png');
        
        //FOES//
        this.load.image('sp-foe', 'assets/sp/sp-foe.png');
        this.load.spritesheet('sp-lifebar', 'assets/sp/sp-lifebar.png', SPRITESIZE, SPRITESIZE/8, 2);
        
        //TURRET//
        this.load.spritesheet('sp-turret-v2', 'assets/sp/sp-turret-v2.png', SPRITESIZE, SPRITESIZE, 3);
        
        this.load.spritesheet('sp-turret', 'assets/sp/sp-turret.png', SPRITESIZE, SPRITESIZE, 8);
        this.load.image('sp-visualField', 'assets/sp/sp-visualfield.png');
        this.load.spritesheet('sp-exit', 'assets/sp/sp-exit.png', SPRITESIZE, SPRITESIZE, 2);
        
        //BULLETS//
        this.load.spritesheet('sp-bullet', 'assets/sp/sp-bullet.png', SPRITESIZE/2, SPRITESIZE/2, 1);
        
        //GENERATOR//
        this.load.image('sp-generator', 'assets/sp/sp-generator.png');
        
        //LEVEL//
        this.load.image('tileset1', 'assets/map/tileset/tileset-mario.png');
        this.load.tilemap('level1', 'assets/map/tile-test.json', null, Phaser.Tilemap.TILED_JSON);
    },
    
    
    create:function()
    {
        //console.log("STATE Preloader - Create");
        
        this.game.state.start("LevelProto");
    }
    
}
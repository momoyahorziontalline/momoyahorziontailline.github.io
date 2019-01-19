var mainState = {
    preload: function() {
    game.load.image('preload', 'assets/preload.png'); 
    game.load.image('preload_hd','assets/preload_hd.png');
  
  },
  
  create: function() {
   game.state.start('Preloader');
    alert("上下左右鍵為方向，\n搭配音樂、音效，\n吃到黃色禮物+10、\n吃到綠色禮物+20、\n吃到薑餅人+50、\n吃到火堆-100。\n共兩關，第一關走到門會進行第二關送禮物給小孩,\n趕快來幫忙送禮物吧!");
  },
};

var Preloader = {
  ready: false,
  
  preload: function() {
    game.add.sprite(0,0,'preload_hd');
    this.preloadBar = game.add.sprite(10, 150, 'preload');
  game.load.setPreloadSprite(this.preloadBar);
    
    
    this.startText = game.add.text(200, 100, '請您來點我哦!', 
                                   {font: '36px Arial', fill: '#FFFFFF'});
       this.startText.anchor.set(0.5);
    game.load.audio('sing1', 'assets/sing1.mp3');//叮叮噹
    
    game.load.audio('coin', 'assets/coin.mp3');//得分
    game.load.audio('mario', 'assets/mario.mp3');//扣分
      
  },
   

update: function() {
  if(game.input.activePointer.leftButton.isDown){
      if (!this.ready){
        if (game.cache.isSoundDecoded('sing1')&&
           game.cache.isSoundDecoded('coin')&&
           game.cache.isSoundDecoded('mario')){
          this.ready = true;
          
          if(level == 1){
            game.state.start('State1');
          }else if (level == 2){
            game.state.start('State2');   
          }
        }
      }
    }
  },
};
var State1 = {
 preload: function() {
   game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('tiles', 'assets/tiles.png');//磚塊
   game.load.spritesheet('car', 'assets/car.png', 32, 32);
   game.load.image('flame', 'assets/flame.png');//火花
   game.load.image('gift', 'assets/gift.png');//禮物
   game.load.image('gift2', 'assets/gift2.png');//禮物
   game.load.image('man', 'assets/man.png');//薑餅人
   game.load.image('fire', 'assets/fire.png');//火堆
   game.load.audio('sing1', 'assets/sing1.mp3');//叮叮噹
   game.load.audio('coin', 'assets/coin.mp3');//得分
   game.load.audio('mario', 'assets/mario.mp3');//扣分
   game.load.image('door','assets/door.png');   
 },
  
 create: function() {

   this.musicState = this.add.audio('sing1');
  this.musicState.play('', 0, 1, true);
 
    

   this.safeTileIndex = 4;//安全磚塊為 4 號磚塊(亦即可在其上行駛者)
   this.gridsize = 32;//即磚塊尺寸
   
   this.speed = 100;//汽車速度
   this.threshold = 4;//汽車位置是像素座標
   
   this.gridPos = new Phaser.Point();
   this.turnPoint = new Phaser.Point();//轉彎點
   this.fourTiles = [null, null, null, null, null];//用來記錄汽車目前位置的上下左右磚塊網格座標(1 左，2 右，3 上，4下)，第 0 個元素不使用
   this.opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];//記錄反方向
   this.currentDir = Phaser.UP;//現在的汽車方向(初始值設為向上)
   
   game.physics.startSystem(Phaser.Physics.ARCADE);//啟用 Arcade 物理系統
   
   //地圖
   this.map = game.add.tilemap('map');//將地圖資料加入遊戲  
   this.map.addTilesetImage('tiles', 'tiles');
   this.layer = this.map.createLayer('Tile Layer 1');
   this.map.setCollision([1, 2, 3], true, this.layer);//設定圖層磚塊的碰撞效應
   
   //前往下一關
   this.doors=game.add.group();
   this.doors.enableBody=true;
   this.doors.visible=true;
   var door=this.doors.create(576,416,'door');
   door.body.immovable=true;
   
   //聖誕老人
   this.car = game.add.sprite(48, 48, 'car');//汽車精靈
   game.add.tween(this.car).to({angle:180}, 100, 'Linear', true);
   this.car.anchor.set(0.5);//設定汽車錨點為中心點
   game.physics.arcade.enable(this.car);//汽車啟用 Arcade 物理特性
   this.cursors = game.input.keyboard.createCursorKeys();//設定方向鍵
   this.move(Phaser.DOWN);//新增 move()方法，讓汽車在一開始時就向下移動
   this.car.animations.add('on', [0, 1, 2], 10, true);
   this.car.animations.add('right', [3, 4, 5], 10, true);
   this.car.animations.add('left', [6, 7, 8], 10, true);
   
   
   //火花
   this.flame = game.add.sprite(48, 48, 'flame');
   this.flame.anchor.set(0.5);
   this.flame.visible = false;
     
   
   var tiles = this.layer.getTiles(0, 0, this.layer.width, this.layer.height);
   this.sateTiles = [];
     
    //禮物  
   this.gift = game.add.group();
   this.gift.enableBody = true;
   ledge = this.gift.create(385, 353, 'gift');
   ledge.body.immovable = true;
   ledge = this.gift.create(385, 50, 'gift');
   ledge.body.immovable = true;
     
    //禮物  
   this.gift2 = game.add.group();
   this.gift2.enableBody = true
   ledge = this.gift2.create(95, 190, 'gift2');
   ledge.body.immovable = true; 
   ledge = this.gift2.create(225, 415, 'gift2');
   ledge.body.immovable = true;
   ledge = this.gift2.create(290, 285, 'gift2');
   ledge.body.immovable = true; 
     
     
     //火堆 
   this.fire = game.add.group();
   this.fire.enableBody = true
   ledge = this.fire.create(95, 300, 'fire');
   ledge.body.immovable = true;
   ledge = this.fire.create(60, 190, 'fire');
   ledge.body.immovable = true;
   ledge = this.fire.create(450, 415, 'fire');
   ledge.body.immovable = true; 

     
     
  //分數計算
    this.scoreText = game.add.text(16, 490, '分數： 0 分', {fontSize: '32px', fill: '#000'});
     
   //時間計時
   time=game.add.text(230,490, '時間： 0 秒', {fontSize: '32px', fill: '#000'});
   game.time.events.loop(Phaser.Timer.SECOND,this.updateCounter,this);
   //關卡
    this.gamenametext=game.add.text(500,490,'Level 1',{fontSize: '32px', fill: '#000'});
    this.gamenametext.fixedToCamera = true;  
 },
  
update: function() {
    
	game.physics.arcade.collide(this.car, this.layer);
	this.gridPos.x = game.math.snapToFloor(Math.floor(this.car.x),this.gridsize)/this.gridsize;
	this.gridPos.y = game.math.snapToFloor(Math.floor(this.car.y),this.gridsize)/this.gridsize; 
    
	var i = this.layer.index;
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	this.fourTiles[Phaser.LEFT] = this.map.getTileLeft(i, x, y);
	this.fourTiles[Phaser.RIGHT] = this.map.getTileRight(i, x, y);
	this.fourTiles[Phaser.UP] = this.map.getTileAbove(i, x, y);
	this.fourTiles[Phaser.DOWN] = this.map.getTileBelow(i, x, y);

	if (this.cursors.left.isDown) {
		this.turn(Phaser.LEFT);
		this.flame.anchor.set(1,0.5);
        this.car.animations.play('left');
	}
	else if (this.cursors.right.isDown) {
		this.turn (Phaser.RIGHT);
		this.flame.anchor.set(0,0.5);
        this.car.animations.play('right');
	}
	else if (this.cursors.up.isDown) {
		this.turn (Phaser.UP);
		this.flame.anchor.set(0.5,1);
        this.car.animations.play('on');
	}
	else if (this.cursors.down.isDown) {
		this.turn (Phaser.DOWN);
		this.flame.anchor.set(0.5,0);
        this.car.animations.play('on');
		}
     //車碰到門
   game.physics.arcade.overlap(this.car, this.doors,this.hitdoor, null, this);  
     //車碰到禮物
   game.physics.arcade.collide(this.gift, this.layer);
   game.physics.arcade.overlap(this.car, this.gift,this.collectStar , null, this);  
     //車碰到禮物2
   game.physics.arcade.collide(this.gift2, this.layer);
   game.physics.arcade.overlap(this.car, this.gift2,this.collectStars , null, this);
	 //車碰到火堆
   game.physics.arcade.collide(this.fire, this.layer); 
   game.physics.arcade.overlap(this.car, this.fire,this.collectMonster, null, this);
	},
    

 
 move: function(to) {
		
	var speed = this.speed;
	if (to===Phaser.LEFT || to===Phaser.UP) {
		speed = -speed;
		}
	if (to===Phaser.LEFT || to===Phaser.RIGHT) {
		this.car.body.velocity.x = speed;
		}else {
		this.car.body.velocity.y = speed;
		}
		this.currentDir = to;
		
	if(to==Phaser.LEFT){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.RIGHT){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.UP){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.DOWN){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	},
  
turn: function(to) {
	if (this.currentDir===to || this.fourTiles[to]===null ||
		this.fourTiles[to].index!==this.safeTileIndex) {
		return;
	}
	if (this.currentDir===this.opposites[to]) {
		this.move(to);
		return;
	}
	
	this.turnPoint.x = this.gridPos.x*this.gridsize + this.gridsize/2;
	this.turnPoint.y = this.gridPos.y*this.gridsize + this.gridsize/2;
	var cx = Math.floor(this.car.x);
	var cy = Math.floor(this.car.y);
	if (!Phaser.Math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) ||
		!Phaser.Math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)) {
		return;
		}
	this.car.x = this.turnPoint.x;
	this.car.y = this.turnPoint.y;
	this.car.body.reset(this.turnPoint.x, this.turnPoint.y);
	this.move(to);
	},

//時間計時
updateCounter: function(){
     counter += 1;
    time.setText('時間： '+　counter　+ ' 秒');
},
    
hitdoor: function(){
    level = 2;
    scoreText = score;
    game.state.start('State2');
},   
 //禮物得分
collectStar: function(car, gift) {
	gift.kill();
    game.sound.play('coin');
	score += 10;
	this.scoreText.text = '分數：' + score + ' 分'; 
},
//禮物得分
collectStars: function(car, gift2) {
	gift2.kill();
    game.sound.play('coin');
	score += 20;
	this.scoreText.text = '分數：' + score + ' 分'; 
},
//火堆得分
collectMonster: function(car, fire) {
	fire.kill();
    game.sound.play('mario');
	score -= 100;
	this.scoreText.text = '分數：' + score + ' 分'; 
 },
};
  
var State2 = {
 preload: function() {
   game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('tiles', 'assets/tiles.png');//磚塊
//   game.load.image('car', 'assets/car.png');//聖誕老人
     game.load.spritesheet('car', 'assets/car.png', 32, 32);
   game.load.image('flame', 'assets/flame.png');//火花
   game.load.image('gift', 'assets/gift.png');//禮物
   game.load.image('gift2', 'assets/gift2.png');//禮物
   game.load.image('man', 'assets/man.png');//薑餅人
   game.load.image('fire', 'assets/fire.png');//火堆
   game.load.audio('sing1', 'assets/sing1.mp3');//叮叮噹
     game.load.audio('coin', 'assets/coin.mp3');//得分
      game.load.audio('mario', 'assets/mario.mp3');//扣分
//   game.load.image('doors','assets/doors.png');   
   game.load.image('kid','assets/kid.png');  
 },
  
 create: function() {
//   this.musicState = this.add.audio('sing');
//   this.musicState.play('', 0, 1, true);
//    this.platforms=game.add.group();
//    this.platforms.enableBody=true;
    
     
   this.safeTileIndex = 4;//安全磚塊為 4 號磚塊(亦即可在其上行駛者)
   this.gridsize = 32;//即磚塊尺寸
   
   this.speed = 100;//汽車速度
   this.threshold = 4;//汽車位置是像素座標
   
   this.gridPos = new Phaser.Point();
   this.turnPoint = new Phaser.Point();//轉彎點
   this.fourTiles = [null, null, null, null, null];//用來記錄汽車目前位置的上下左右磚塊網格座標(1 左，2 右，3 上，4下)，第 0 個元素不使用
   this.opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];//記錄反方向
   this.currentDir = Phaser.UP;//現在的汽車方向(初始值設為向上)
   
   game.physics.startSystem(Phaser.Physics.ARCADE);//啟用 Arcade 物理系統
   
   //地圖
   this.map = game.add.tilemap('map');//將地圖資料加入遊戲  
   this.map.addTilesetImage('tiles', 'tiles');
   this.layer = this.map.createLayer('Tile Layer 2');
   this.map.setCollision([1, 2, 3], true, this.layer);//設定圖層磚塊的碰撞效應
   
   //前往下一關
   this.kid=game.add.group();
   this.kid.enableBody=true;
   this.kid.visible=true;
   var kid=this.kid.create(576,416,'kid');
   kid.body.immovable=true;
   
   //聖誕老人
   this.car = game.add.sprite(48, 48, 'car');//汽車精靈
   game.add.tween(this.car).to({angle:180}, 100, 'Linear', true);
   this.car.anchor.set(0.5);//設定汽車錨點為中心點
   game.physics.arcade.enable(this.car);//汽車啟用 Arcade 物理特性
   this.cursors = game.input.keyboard.createCursorKeys();//設定方向鍵
   this.move(Phaser.DOWN);//新增 move()方法，讓汽車在一開始時就向下移動
   this.car.animations.add('on', [0, 1, 2], 10, true);
   this.car.animations.add('right', [3, 4, 5], 10, true);
   this.car.animations.add('left', [6, 7, 8], 10, true);
   
   //火花
   this.flame = game.add.sprite(48, 48, 'flame');
   this.car.anchor.set(0.5);
   this.flame.visible = false;
     
   
   var tiles = this.layer.getTiles(0, 0, this.layer.width, this.layer.height);
   this.sateTiles = [];
     
    //禮物  
   this.gift = game.add.group();
   this.gift.enableBody = true;
   ledge = this.gift.create(385, 353, 'gift');
   ledge.body.immovable = true;
   ledge = this.gift.create(385, 50, 'gift');
   ledge.body.immovable = true;
     
    //禮物  
   this.gift2 = game.add.group();
   this.gift2.enableBody = true
   ledge = this.gift2.create(95, 190, 'gift2');
   ledge.body.immovable = true; 
   ledge = this.gift2.create(225, 415, 'gift2');
   ledge.body.immovable = true;
   ledge = this.gift2.create(290, 285, 'gift2');
   ledge.body.immovable = true; 
     
    //薑餅人 
   this.man = game.add.group();
   this.man.enableBody = true
   ledge = this.man.create(510, 330, 'man');
   ledge.body.immovable = true; 
   ledge = this.man.create(400, 415, 'man');
   ledge.body.immovable = true;
   ledge = this.man.create(30, 80, 'man');
   ledge.body.immovable = true;
 
     
     
     //火堆 
   this.fire = game.add.group();
   this.fire.enableBody = true
   ledge = this.fire.create(95, 300, 'fire');
   ledge.body.immovable = true;
   ledge = this.fire.create(60, 190, 'fire');
   ledge.body.immovable = true;
   ledge = this.fire.create(450, 415, 'fire');
   ledge.body.immovable = true; 
   ledge = this.fire.create(513, 95, 'fire');
   ledge.body.immovable = true; 
     
  /*   
  //分數計算
    this.score = 0;//分數屬性初始值為 0
    */ 
    this.scoreText = game.add.text(16, 490, '分數：' + score + ' 分', {fontSize: '32px', fill: '#000'});
    
   //時間計時
   time=game.add.text(230,490, '時間： 0 秒', {fontSize: '32px', fill: '#000'});
   game.time.events.loop(Phaser.Timer.SECOND,this.updateCounter,this);
   //關卡
    this.gamenametext=game.add.text(500,490,'Level 2',{fontSize: '32px', fill: '#000'});
    this.gamenametext.fixedToCamera = true;  
     
 },
  
 update: function() {

	game.physics.arcade.collide(this.car, this.layer);
	this.gridPos.x = game.math.snapToFloor(Math.floor(this.car.x),this.gridsize)/this.gridsize;
	this.gridPos.y = game.math.snapToFloor(Math.floor(this.car.y),this.gridsize)/this.gridsize; 
	
	var i = this.layer.index;
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	this.fourTiles[Phaser.LEFT] = this.map.getTileLeft(i, x, y);
	this.fourTiles[Phaser.RIGHT] = this.map.getTileRight(i, x, y);
	this.fourTiles[Phaser.UP] = this.map.getTileAbove(i, x, y);
	this.fourTiles[Phaser.DOWN] = this.map.getTileBelow(i, x, y);

	if (this.cursors.left.isDown) {
		this.turn(Phaser.LEFT);
		this.flame.anchor.set(1,0.5);
        this.car.animations.play('left');
	}
	else if (this.cursors.right.isDown) {
		this.turn (Phaser.RIGHT);
		this.flame.anchor.set(0,0.5);
        this.car.animations.play('right');
	}
	else if (this.cursors.up.isDown) {
		this.turn (Phaser.UP);
		this.flame.anchor.set(0.5,1);
        this.car.animations.play('on');
	}
	else if (this.cursors.down.isDown) {
		this.turn (Phaser.DOWN);
		this.flame.anchor.set(0.5,0);
        this.car.animations.play('on');
		}
     //車碰到薑餅人
   game.physics.arcade.collide(this.man, this.layer);
   game.physics.arcade.overlap(this.car, this.man,this.collectStarss , null, this);  
     //車碰到禮物
   game.physics.arcade.collide(this.gift, this.layer);
   game.physics.arcade.overlap(this.car, this.gift,this.collectStar , null, this);  
     //車碰到禮物2
   game.physics.arcade.collide(this.gift2, this.layer);
   game.physics.arcade.overlap(this.car, this.gift2,this.collectStars , null, this);
	 //車碰到火堆
   game.physics.arcade.collide(this.fire, this.layer); 
   game.physics.arcade.overlap(this.car, this.fire,this.collectMonster, null, this);
     //車碰到小孩
     game.physics.arcade.overlap(this.car, this.kid,this.hitkid, null, this);
	},
    

 
 move: function(to) {
		
	var speed = this.speed;
	if (to===Phaser.LEFT || to===Phaser.UP) {
		speed = -speed;
		}
	if (to===Phaser.LEFT || to===Phaser.RIGHT) {
		this.car.body.velocity.x = speed;
		}else {
		this.car.body.velocity.y = speed;
		}
		this.currentDir = to;
		
	if(to==Phaser.LEFT){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.RIGHT){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.UP){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
	if(to==Phaser.DOWN){
		game.add.tween(this.car).to({angle:0}, 100, 'Linear', true);
		}
		
		
		
	},
  
turn: function(to) {
	if (this.currentDir===to || this.fourTiles[to]===null ||
		this.fourTiles[to].index!==this.safeTileIndex) {
		return;
	}
	if (this.currentDir===this.opposites[to]) {
		this.move(to);
		return;
	}
	
	this.turnPoint.x = this.gridPos.x*this.gridsize + this.gridsize/2;
	this.turnPoint.y = this.gridPos.y*this.gridsize + this.gridsize/2;
	var cx = Math.floor(this.car.x);
	var cy = Math.floor(this.car.y);
	if (!Phaser.Math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) ||
		!Phaser.Math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)) {
		return;
		}
	this.car.x = this.turnPoint.x;
	this.car.y = this.turnPoint.y;
	this.car.body.reset(this.turnPoint.x, this.turnPoint.y);
	this.move(to);
	},
  
//時間計時
updateCounter: function(){
     counter += 1;
    time.setText('時間： '+　counter　+ ' 秒');
  }, 
 //禮物得分
collectStar: function(car, gift) {
	gift.kill();
    game.sound.play('coin');
	score += 10;
	this.scoreText.text = '分數：' + score + ' 分'; 
},
//禮物得分
collectStars: function(car, gift2) {
	gift2.kill();
    game.sound.play('coin');
	score += 20;
	this.scoreText.text = '分數：' + score + ' 分'; 
},
    //薑餅人得分
collectStarss: function(car, man) {
	man.kill();
    game.sound.play('coin');
	score += 50;
	this.scoreText.text = '分數：' + score + ' 分'; 
},
//火堆得分
collectMonster: function(car, fire) {
	fire.kill();
    game.sound.play('mario');
	score -= 100;
	this.scoreText.text = '分數：' + score + ' 分'; 
}, 
   hitkid: function(car,kid){

       //this.musicstate.stop();
       car.kill();
      if(score>0){
          alert('Merry Christmas！！ 總分：'+ score+' 分 '+' 花費時間： '+counter+' 秒');
   }else if(score==0){
          alert('你好意思沒送禮物嗎?  總分：'+ score+' 分 '+' 花費時間： '+counter+' 秒');
   } else {
          alert('很廢ㄟ！！ 總分：'+ score+' 分 '+' 花費時間： '+counter+' 秒');
      }
       game.state.start('mainState'); 
},
  

};

var score = 0;
var scoreText = 0;
var counter = 0;
var time = 0;
var level = 1;
var game = new Phaser.Game(640, 540, Phaser.AUTO, 'gameDiv');

game.state.add('mainState', mainState);
game.state.add('Preloader', Preloader);
game.state.add('State1', State1);
game.state.add('State2', State2);
game.state.start('mainState');
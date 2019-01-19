var Newyear = {
  
  preload: function() {  
      game.load.image('enter', 'assets/enter.png');
      game.load.image('background2', 'assets/background2.png');
  },
  
  create: function() {
     
   game.state.start('Preloader');
    alert("上下左右鍵為方向，\n搭配音樂、音效，\n金幣+5，\n紅包+10，\n金元寶+30， \n鞭炮-20，\n炸彈重新開始，\n分數會給予不同的評價。");
  },
};

var Preloader = {
  ready: false,
  
  preload: function() {
    game.add.sprite(0, 0, 'background2');
    this.startText = game.add.text(360, 450, 'Loding...',{font: '36px Arial', fill: '#000000'});
    this.startText.anchor.set(0.5);
    
        //voice
        game.load.audio('banana', 'assets/banana.mp3');
        game.load.audio('die', 'assets/die.mp3');
        game.load.audio('eat', 'assets/eat.mp3');
	  game.load.audio('boom', 'assets/boom.wav');
        
  },
  
 update: function() {
    
   if (this.ready) {
   return;
  }
  if (game.cache.isSoundDecoded('banana') &&
      game.cache.isSoundDecoded('die')&&
      game.cache.isSoundDecoded('eat')&&
      game.cache.isSoundDecoded('boom')
      ) {
   this.ready = true;
      
      this.load = game.add.sprite(460, 410, 'enter');
  //Enter    
      this.GameButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.GameButton.onDown.add(this.Game, this);
  }
   
 },
   Game:function(){
  game.state.start('main');
 }, 
 
};


var mainState = {
    preload:function(){
        //image
        game.load.image('background', 'assets/background.png');
        game.load.image('bom', 'assets/bom.png');
        game.load.image('bom1', 'assets/bom1.png');
        game.load.image('bom2', 'assets/bom2.png');
        game.load.image('bom3', 'assets/bom3.png');
        game.load.image('bom4', 'assets/bom4.png');
		 game.load.image('boom', 'assets/boom.png');
        game.load.image('die', 'assets/die.png');
        game.load.image('money', 'assets/money.png');
        game.load.image('bag', 'assets/bag.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('coin1', 'assets/coin1.png');
        game.load.image('tenscore', 'assets/tenscore.png'); 
        game.load.image('thirtyscore', 'assets/thirtyscore.png'); 
        game.load.image('fivescore', 'assets/fivescore.png'); 
        game.load.image('fivescore1', 'assets/fivescore1.png');
		 game.load.image('twentyscore', 'assets/twentyscore.png');
        game.load.spritesheet('ps', 'assets/ps.png', 64, 64);
        

    },
        
    create:function(){
        
        this.musicState = this.add.audio('banana');
        this.musicState.play('', 0, 1, true);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');//背景圖
         
    
        
        
        //人物
       this.player = game.add.sprite(0, 438, 'ps');
       game.physics.arcade.enable(this.player);
       this.player.body.gravity.x = 100;
        this.player.anchor.set(0.5,0);
        this.player.body.bounce.y = 0.2;
        
       this.player.body.collideWorldBounds = true;
       this.player.body.setSize(50, 60, 5, -7);
        this.player.animations.add('middle', [0], 10, true);//向左走
       this.player.animations.add('left', [0, 3, 4, 5], 10, true);//向左走
       this.player.animations.add('right', [6, 7, 8], 10, true);//向右走
       this.cursors = game.input.keyboard.createCursorKeys();//啟動鍵盤   
        
        
        
        //死亡no
        this.die = game.add.sprite(0, 0, 'die');
        this.die.anchor.set(0 , 0);
        this.die.visible = false;
        
        //時間
        timetext=game.add.text(440, 0, 'Time: 30 s', {fontSize: '30px', fill: '#FFFFFF'});
        game.time.events.loop(Phaser.Timer.SECOND,this.updateCounter,this);
        counter=30;
    
        
        //金元寶+紅包
        this.addadd();  
        this.score = 0;
        this.scoreText = game.add.text(0, 0, 'Score: 0', {fontSize: '30px', fill: '#FFFFFF'});
        
          //加10分
        this.tenscore = game.add.sprite(0, 0, 'tenscore');
        this.tenscore.alpha = 0;
        this.tenscore.visible = false;
        
          //加30分
        this.thirtyscore = game.add.sprite(0, 0, 'thirtyscore');
        this.thirtyscore.alpha = 0;
        this.thirtyscore.visible = false;
        
           //加5分
        this.fivescore = game.add.sprite(0, 0, 'fivescore');
        this.fivescore.alpha = 0;
        this.fivescore.visible = false;
        
          //加5分
        this.fivescore1 = game.add.sprite(0, 0, 'fivescore1');
        this.fivescore1.alpha = 0;
        this.fivescore1.visible = false;
		
		  //減20分
        this.twentyscore = game.add.sprite(0, 0, 'twentyscore');
        this.twentyscore.alpha = 0;
        this.twentyscore.visible = false;
       
    },
        
    update:function(){
        
         if (this.gameover){
            return;            
        }
   
         
        
        this.game.physics.arcade.overlap(this.player, this.money, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.bag, this.collect2, null, this);
        this.game.physics.arcade.overlap(this.player, this.coin, this.collect3, null, this);
        this.game.physics.arcade.overlap(this.player, this.coin1, this.collect4, null, this);
        this.game.physics.arcade.overlap(this.player, this.bom, this.hit, null, this);
        this.game.physics.arcade.overlap(this.player, this.bom1, this.hit1, null, this);
        this.game.physics.arcade.overlap(this.player, this.bom2, this.hit2, null, this);
        this.game.physics.arcade.overlap(this.player, this.bom3, this.hit3, null, this);
        this.game.physics.arcade.overlap(this.player, this.bom4, this.hit4, null, this);
		 this.game.physics.arcade.overlap(this.player, this.boom, this.hitten, null, this);
        
        
 
        
        
        this.money.body.velocity.y = Math.random()*900;    
        this.bag.body.velocity.y = Math.random()*800; 
        this.coin.body.velocity.y = Math.random()*680; 
        this.coin1.body.velocity.y = Math.random()*700; 
        this.bom.body.velocity.y = Math.random()*800;
        this.bom1.body.velocity.y = Math.random()*700;
        this.bom2.body.velocity.y = Math.random()*700;
        this.bom3.body.velocity.y = Math.random()*680;
        this.bom4.body.velocity.y = Math.random()*900;
		 this.boom.body.velocity.y = Math.random()*900;
        

         this.player.body.velocity.x = 0;
         if (this.cursors.left.isDown) {
           this.player.body.velocity.x = -300;
           this.player.animations.play('left');
         }
        else if (this.cursors.right.isDown) {
            
            this.player.body.velocity.x = 300;               
            this.player.animations.play('right');
        }
        
        
         else {
           this.player.animations.stop();
           this.player.frame = 4;
          }

        if(this.money.y>=700){
            this.addadd();
        }
        
        if(this.bag.y>=700){
            this.addadd();
        }
        if(this.coin.y>=700){
            this.addadd();
        }
        
        if(this.coin1.y>=700){
            this.addadd();
        }
        
        if(this.bom.y>=800){
            this.addadd();
        }
         if(this.bom1.y>=800){
            this.addadd();
        }

         if(this.bom2.y>=800){
            this.addadd();
        }

         if(this.bom3.y>=800){
            this.addadd();
        }

         if(this.bom4.y>=800){
            this.addadd();
        }
		
		  if(this.boom.y>=800){
            this.addadd();
        }
        

    },
     
    //加物件
    addadd: function(){
        this.x1 = Math.random()*550;
        this.x2 = Math.random()*550;
        this.x5 = Math.random()*500;
        this.x3 = Math.random()*550;
        this.x4 = Math.random()*550;
        this.x6 = Math.random()*500;
        this.x7 = Math.random()*500;
        this.x8 = Math.random()*500;
        this.x9 = Math.random()*500;
		this.x10 = Math.random()*500;
        

        
        this.money = game.add.sprite(this.x1,-121,'money');
        game.physics.enable(this.money, Phaser.Physics.ARCADE);
        
        this.bag = game.add.sprite(this.x2,-121,'bag');
        game.physics.enable(this.bag, Phaser.Physics.ARCADE);
        
        this.coin = game.add.sprite(this.x4,-121,'coin');
        game.physics.enable(this.coin, Phaser.Physics.ARCADE);
        
        this.coin1 = game.add.sprite(this.x5,-150,'coin');
        game.physics.enable(this.coin1, Phaser.Physics.ARCADE);
        
        this.bom = game.add.sprite(this.x3,-121,'bom');
        game.physics.enable(this.bom, Phaser.Physics.ARCADE);
        
        this.bom1 = game.add.sprite(this.x6,-121,'bom1');
        game.physics.enable(this.bom1, Phaser.Physics.ARCADE);
        
        this.bom2 = game.add.sprite(this.x7,-121,'bom2');
        game.physics.enable(this.bom2, Phaser.Physics.ARCADE);
        
        this.bom3 = game.add.sprite(this.x8,-121,'bom3');
        game.physics.enable(this.bom3, Phaser.Physics.ARCADE);
        
        this.bom4 = game.add.sprite(this.x9,-121,'bom4');
        game.physics.enable(this.bom4, Phaser.Physics.ARCADE);
		
		this.boom = game.add.sprite(this.x10,-121,'boom');
        game.physics.enable(this.boom, Phaser.Physics.ARCADE);
    },
    start: function(){
        if (this.gameover){
            game.state.start('main');
            
        }
        
      
   

    },
    
    updateCounter: function(){
    //時間計時
    counter-=1;
    timetext.setText('Time: '+counter+' s');
    if(counter==0){
         this.player.kill();
        this.dieText = game.add.text(250, 90, '時間到!', {fontSize: '24px', fill: '#0000000'});
		    if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<250){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score>249){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
		   
    
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '30px', fill: '#0000000'});
         this.die.position.x = this.player.x;
         this.die.position.y = this.player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

    }
  },
    
    
    
    //金元寶
    collect: function(player,money){
        game.sound.play('eat');
        money.kill();
        this.score += 30;
        var p = new Phaser.Point(this.player.x, this.player.y);   
        this.thirtyscore.x = p.x+10;
        this.thirtyscore.y = p.y-15;
        this.thirtyscore.alpha = 1;
        this.thirtyscore.visible = true; 
        game.add.tween(this.thirtyscore).to({alpha:0,y:p.y-50}, 5000, 'Linear', true, 0);
        mainState.score += 10;
        mainState.scoreText.text = 'Score: ' + mainState.score;
    },
    
    
    //紅包
    collect2: function(player,bag){
        game.sound.play('eat');
        bag.kill();
        var p = new Phaser.Point(this.player.x, this.player.y);   
        this.tenscore.x = p.x+10;
        this.tenscore.y = p.y-15;
        this.tenscore.alpha = 1;
        this.tenscore.visible = true; 
        game.add.tween(this.tenscore).to({alpha:0,y:p.y-50}, 5000, 'Linear', true, 0);
        mainState.score += 10;
        mainState.scoreText.text = 'Score: ' + mainState.score;
    },
    
  

      //金幣
    collect3: function(player,coin){
        game.sound.play('eat');
        coin.kill();
        var p = new Phaser.Point(this.player.x, this.player.y);   
        this.fivescore.x = p.x+10;
        this.fivescore.y = p.y-15;
        this.fivescore.alpha = 1;
        this.fivescore.visible = true; 
        game.add.tween(this.fivescore).to({alpha:0,y:p.y-50}, 5000, 'Linear', true, 0);
        mainState.score += 5;
        mainState.scoreText.text = 'Score: ' + mainState.score;
    },
    
     collect4: function(player,coin1){
        game.sound.play('eat');
        coin1.kill();
        var p = new Phaser.Point(this.player.x, this.player.y);   
        this.fivescore1.x = p.x+10;
        this.fivescore1.y = p.y-15;
        this.fivescore1.alpha = 1;
        this.fivescore1.visible = true; 
        game.add.tween(this.fivescore1).to({alpha:0,y:p.y-50}, 5000, 'Linear', true, 0);
        mainState.score += 5;
        mainState.scoreText.text = 'Score: ' + mainState.score;
    },
           
	 hitten: function(player,boom){
        game.sound.play('boom');
        boom.kill();
        var p = new Phaser.Point(this.player.x, this.player.y);   
        this.twentyscore.x = p.x+10;
        this.twentyscore.y = p.y-15;
        this.twentyscore.alpha = 1;
        this.twentyscore.visible = true; 
        game.add.tween(this.twentyscore).to({alpha:0,y:p.y-50}, 5000, 'Linear', true, 0);
        mainState.score -= 20;
        mainState.scoreText.text = 'Score: ' + mainState.score;
    },
        

    //炸彈
     hit: function(player,bom){
        player.kill();
         bom.kill();
         game.sound.play('die');
            this.musicState.stop();
         if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<300){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score>299){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
          else if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});
		}
    
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '24px', fill: '#0000000'});
         this.die.position.x = player.x;
         this.die.position.y = player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

   
    },
    
      hit1: function(player,bom1){
        player.kill();
         bom1.kill();
         game.sound.play('die');
            this.musicState.stop();
        if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<300){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score>299){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
           else if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});
		}
    
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '24px', fill: '#0000000'});
         this.die.position.x = player.x;
         this.die.position.y = player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

    },

  hit2: function(player,bom2){
        player.kill();
         bom2.kill();
         game.sound.play('die');
            this.musicState.stop();
         if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<300){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score>299){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});
		}
	  
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '24px', fill: '#0000000'});
         this.die.position.x = player.x;
         this.die.position.y = player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

    },

      hit3: function(player,bom3){
        player.kill();
         bom3.kill();
         game.sound.play('die');
            this.musicState.stop();
        if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<300){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score>299){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
          else if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});
		}
    
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '24px', fill: '#0000000'});
         this.die.position.x = player.x;
         this.die.position.y = player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

    },

      hit4: function(player,bom4){
        player.kill();
         bom4.kill();
         game.sound.play('die');
            this.musicState.stop();
         if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});}
         else if(this.score<50){
         this.dieText = game.add.text(100, 300, '請多努力!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<150){
         this.dieText = game.add.text(100, 300, '這麼少錢!', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<300){
         this.dieText = game.add.text(100, 300, '沒有足夠的錢', {fontSize: '68px', fill: '#0000000'});}
        else if(this.score>299){
         this.dieText = game.add.text(100, 300, '哇!好多錢錢啊~', {fontSize: '68px', fill: '#0000000'});}
         else if(this.score<0){
			this.dieText = game.add.text(100, 300, '好意思嗎?!', {fontSize: '65px', fill: '#0000000'});
		}
    
         this.dieText = game.add.text(300, 400, '5秒後重新開始', {fontSize: '24px', fill: '#0000000'});
         this.die.position.x = player.x;
         this.die.position.y = player.y;
         this.die.visible = true;
         var delay=100;
         game.time.events.add(delay,this.restart,this);

   
    },

    


        
    //延遲
    restart: function(){
    counter=5
    setTimeout('ekaddtime()',4000);
   this.musicState.stop();
  },
    
};
//重新開始
function ekaddtime(){
  game.state.start('main');
    
  
}

var game = new Phaser.Game(600, 500, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.add('Newyear', Newyear);
game.state.add('Preloader', Preloader);
game.state.start('Newyear');
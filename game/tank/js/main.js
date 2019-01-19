var mainState = {
 count: 0,
 command: 'left',  
 preload: function() {
   game.load.image('background', 'assets/background.png');
   game.load.image('tank', 'assets/tank.png');
   game.load.image('turret', 'assets/turret.png');
   game.load.image('bullet', 'assets/bullet.png');
   game.load.image('bom', 'assets/bom.png');
   game.load.image('target', 'assets/target.png');
   game.load.image('land', 'assets/land.png');
   game.load.image('many', 'assets/many.png');
   game.load.audio('fire', 'assets/fire.mp3');//槍聲
   game.load.audio('bazooka', 'assets/bazooka.wav');//爆炸聲
 },
  
    //初始設定
 create: function() {
   game.renderer.renderSession.roundPixels = true;
   game.world.setBounds(0, 0, 992, 480);//設定遊戲世界的邊界
   game.physics.startSystem(Phaser.Physics.ARCADE); //使用 Arcade 物理系統
   game.physics.arcade.gravity.y = 200;//設定重力為 200
   
    //加入背景
   game.add.sprite(0, 0, 'background');
   
    //標靶
   this.targets = game.add.group(); //加入標靶群組
   this.targets.enableBody = true;//啟用標靶精靈的物理物體特性，因為要判斷碰撞
   this.targets.create(250, 353, 'target');
   this.targets.create(423, 152, 'target');
   this.targets.create(575, 305, 'target');
   this.targets.create(700, 353, 'target');
   this.targets.create(940, 93, 'target');
   this.targets.setAll('body.allowGravity', false);//設定不允許重力作用，否則會落下
   this.numTargets = 5;
   
    //子彈
   this.bullet = game.add.sprite(20, 50, 'bullet');
   this.bullet.exists = false;
   game.physics.arcade.enable(this.bullet);//啟用 Arcade 物理特性
   
    //人物+手槍
   this.tank = game.add.sprite(2, 277, 'tank');
   this.turret = game.add.sprite(this.tank.x+38, this.tank.y+28, 'turret');
   
   //火花
   this.bom = game.add.sprite(0,0, 'bom');
   this.bom.anchor.set(-0.5);//錨點為中心點
   this.bom.visible = false;//預設為不可見，待砲彈發射時才呈現
   
   //火力值
   this.power = 300;
   //加入文字物件，放到適當位置，設定字體
   this.powerText = game.add.text(8, 8, 'power : 300', {font: '24px Arial', fill: '#00000'});
   this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
   this.powerText.fixedToCamera = true;//：位置固定在鏡頭(隨鏡頭移動)

   
    //加入鍵盤
   this.cursors = game.input.keyboard.createCursorKeys();
    //將空白建加入按鍵並指派為發射鍵(fireButton)
   this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.fireButton.onDown.add(this.fire, this);//第一個參數：監聽器函式(this.fire),第二個參數：執行監聽器的環境(this：亦即在 main 物件中)

   
    //加入山
   this.land = game.add.bitmapData(992,900);//在遊戲中加入點陣圖資料物件，並指派給 this.land 屬性
   this.land.draw('land');//在點陣圖上繪製land圖形
   this.land.update();//更新
   this.land.addToWorld(0,2);
   
   //加入發射器
   this.emitter = game.add.emitter();
   this.emitter.makeParticles('bom');//製作發射粒子，亦使用 flame 資產
   this.emitter.setXSpeed(-120, 120);//設定粒子 x 方向的隨機速度，範圍為-120 ~ 120 (左右方向)
   this.emitter.setYSpeed(-100, -200);//設定粒子 y 方向的隨機速度，範圍為-100 ~ -200 (僅向上)
   this.emitter.setRotation(); //設定粒子旋轉角度範圍，沒有參數表示不旋轉
   
    //分數
   this.score = 0;
   this.scoreText = game.add.text(150, 8, 'score: 0 分', {font: '24px Arial',fill: '#000000'}); 
   this.scoreText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);  
   this.scoreText.fixedToCamera = true;
 },
   
 update: function() {

   if (this.bullet.exists) {
     
     //偵測砲彈與標靶的關係
     this.physics.arcade.overlap(this.bullet, this.targets, this.hitTarget, null, this);
     
     //砲彈與景觀的關係由撰寫新方法 bulletVsLand()來處理
     this.bulletVsLand();
   } else {//每按一次左鍵或右鍵分別減或加 2 (範圍 200 ~ 600)
      if (this.cursors.left.isDown && this.power>200){
       this.power -=2;
      } else if (this.cursors.right.isDown && this.power<600){
       this.power +=2;
      }
 }//每按一次向下或向上鍵分別加或減 1 度(角度，範圍 0 ~ -40)
   if (this.cursors.up.isDown && this.turret.angle>-40) {
     this.turret.angle--;   
   } else if (this.cursors.down.isDown && this.turret.angle<0) {
     this.turret.angle++;   
   }
   this.powerText.text = 'power: ' + this.power;

   if(this.count%100==0){
     if (this.command=='left'){
       this.command = 'right';  
       console.log(this.count);
     }else if (this.command=='right'){
       this.command = 'left';  
     }  
     this.count = 0;
   }
   this.count++;
   
   if (this.command=='left') {
     this.targets.setAll('body.velocity.x', -10);  
   }else if (this.command=='right') {
     this.targets.setAll('body.velocity.x', 10);  
   }
},

  fire: function() {
   game.sound.play('fire');
   if(this.bullet.exists) { //如果砲彈存在(亦即正在飛行中)，就不允許使用者做任何操作(直接結束函式)
    
     return;
   }
     
   //如果砲彈不存在，則重設砲彈的位置在砲管錨點位置
   this.bullet.reset(this.turret.x+17, this.turret.y+17);
     
   //bullet.end
   var p = new Phaser.Point(this.turret.x, this.turret.y);//先產生一個點，位置在砲管錨點(砲管底部)
   p.rotate(p.x, p.y, this.turret.rotation, false, 32);//就是砲口位置
      
     
   //將火焰位置設在砲口
   this.bom.x = p.x+30;
   this.bom.y = p.y-20;
   this.bom.alpha = 1;//設為不透明(之後會設為透明)
   this.bom.visible = true;//設為可見，亦即發射時可看見
   

     
   //將火焰物件從目前狀態轉到最終狀態
   game.add.tween(this.bom).to({alpha:0}, 100, 'Linear', true);
   
   game.camera.follow(this.bullet);//鏡頭追隨砲彈
     
   //利用 Arcade 物理特性來設定砲彈的速度(產生符合物理現象的運動軌跡)
   game.physics.arcade.velocityFromRotation(this.turret.rotation, this.power, this.bullet.body.velocity);
 },
  
 removeBullet: function(hasExploded) {
   if(typeof hasExploded=='undefined') {
     hasExploded = false;
   }
   this.bullet.kill(); //刪除砲彈
   game.sound.play('bazooka');//爆炸聲
   game.camera.follow();//解除鏡頭追蹤
   var delay = 1000;
   if (hasExploded) {
     delay = 2000;
   }

   game.add.tween(game.camera).to({x:0}, 1000, 'Quint', true, delay);//利用 tween 將鏡頭移回 x=0 的位置(狀態轉變)
  
     
},
   
 hitTarget: function(bullet, target) {
   this.emitter.at(target);//設定發射器在手槍的位置
   this.emitter.explode(2000, 10);//爆炸
   target.kill();//刪除標靶
   mainState.score += 10; //分數+1
   mainState.scoreText.text = 'score: ' + mainState.score+' 分'; 
   this.removeBullet(true);//刪除砲彈
   if (--this.numTargets == 0) {//如果標靶全部打完，重啟遊戲
     setTimeout(function () {
     game.state.start('mainState');
     alert('恭喜你過關了！　開心嗎？？　哈哈大笑');//小視窗
     score=0; //因為已結束重新開始，時間要重新計時
     game.state.start('mainState');
     }, 2000);     
   }
  
 },
   
 bulletVsLand: function() {
   if (this.bullet.x>game.world.width || this.bullet.y>420) {//偵測砲彈是否超出遊戲世界的右方(可以超出上方)或落地
     this.removeBullet();//如果是，則將砲彈刪除，並結束函式
     return;
   }
   
   var x = Math.floor(this.bullet.x);
   var y = Math.floor(this.bullet.y);
   var rgba = this.land.getPixel(x, y);
   if (rgba.a>0) {
     this.land.blendDestinationOut();
     this.land.draw('many', x-15, y-15);
     this.land.blendReset();//重設混和模式
     this.land.update();//更新點陣圖(繪製的結果才會顯現)
     this.removeBullet();//將砲彈刪除
   }
 },
};

var game = new Phaser.Game(660, 480, Phaser.CANVAS, 'gameDiv');
game.state.add('mainState', mainState);
game.state.start('mainState');
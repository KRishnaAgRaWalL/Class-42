var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score = 0;
var foodGroup;
var bananaImage;
var obstacleGroup;
var obstacleImage;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();  
  obstacleGroup = new Group();
}

function draw() { 
  background(0);
 
  text("Score: "+ score, 500,50);

  if(gameState===PLAY){
   spawnFood();
   spawnrock();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale = player.scale + 0.01

    }

    if(obstacleGroup.isTouching(player)){
     
      textSize(30)
      text("so sorry! please try again",100,200)
      reset();
      ground.velocityX=0;
      player.velocityY=0;
      
      backgr.velocityx = 0;
       }

  }

  drawSprites();
}
function spawnFood(){
  if(frameCount%100 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage)
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 350;
    player.depth = banana.depth + 1;
    foodGroup.add(banana)
  }
}


function spawnrock(){
  if(frameCount % 120 === 0){
      obstacle = createSprite(500, 330);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -4;
      obstacle.lifetime = 250;
      obstacleGroup.add(obstacle);
  }
  }
  
  
  function reset (){
    
    foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    backgr.velocityX = 0
    
  }


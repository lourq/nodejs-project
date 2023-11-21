const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player;
let keys;
const game = new Phaser.Game(config);
let eKey;
let compTrigger;
let powerTrigger;

function preload() {
  // this.load.image("background", "/assets/map/map.webp");
  this.load.image("background", "/assets/map/map.png");
  for (let i = 1; i < 7; i++) {
    this.load.image("walk" + i, "/assets/sprite/walk/Walk000" + i + ".png");
  }
  this.load.image("idle", "/assets/sprite/idle.png");
  this.load.image("comp", "/assets/icons/comp.png");
  this.load.image("power", "/assets/icons/power.png");
  // this.load.image("vent", "/assets/icons/vent.png");
}

function create() {
  this.physics.world.setBounds(0, 0, 2000, 2000);

  // this.physics.world.setBounds(0, 0, 2000, 1200);

  const bg = this.add.image(0, 0, "background").setOrigin(0);
  bg.displayWidth = this.physics.world.bounds.width;
  bg.displayHeight = this.physics.world.bounds.height;

  player = this.physics.add.sprite(1000, 0, "walk1").setDisplaySize(20, 26);

  const camera = this.cameras.main.startFollow(player, true);

  camera.setZoom(3);

  keys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  // Создание анимации ходьбы
  this.anims.create({
    key: "walk",
    frames: [
      { key: "walk1" },
      { key: "walk2" },
      { key: "walk3" },
      { key: "walk4" },
      { key: "walk5" },
      { key: "walk6" },
    ],
    frameRate: 15,
    repeat: -1,
  });

  player.anims.play("walk", true);

  const graphics = this.add.graphics();

  graphics.lineStyle(2, 0xff0000, 0.5); // Толщина 2, красный цвет, 50% прозрачности

  graphics.strokeRect(100, 100, 300, 200); // Пример координат и размеров

  // Создание группы для невидимых стен
  const walls = this.physics.add.staticGroup();

  // Добавление невидимых стен
  walls.create(856, 4, null).setSize(260, 20).setOffset(0, 0).setVisible(true);
  walls
    .create(1050, 89, null)
    .setSize(100, 50)
    .setOffset(0, 30)
    .setVisible(true);
  // Вы можете добавить столько стен, сколько вам нужно

  // Включение коллизии между игроком и стенами
  this.physics.add.collider(player, walls);

  compTrigger = this.physics.add.sprite(894, 140, "comp").setVisible(true);
  compTrigger.setDisplaySize(30, 30);

  powerTrigger = this.physics.add.sprite(1070, 550, "power").setVisible(true);
  powerTrigger.setDisplaySize(15, 10);

  // Добавление и настройка клавиши E
  eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
}

function toggleComp() {
  window.location.href = '/menu'
}

function togglePower() {
  console.log('power use');
}

function update() {
  player.setVelocity(0);

  if (keys.left.isDown) {
    player.setVelocityX(-125);
    player.flipX = true; // Разворот спрайта влево
  } else if (keys.right.isDown) {
    player.setVelocityX(125);
    player.flipX = false; // Разворот спрайта вправо
  }

  if (keys.up.isDown) {
    player.setVelocityY(-125);
  } else if (keys.down.isDown) {
    player.setVelocityY(125);
  }
  console.log("X: " + player.x.toFixed(2) + " Y: " + player.y.toFixed(2));

  if (player.body.velocity.x !== 0 || player.body.velocity.y !== 0) {
    player.anims.play("walk", true);
  } else {
    player.anims.stop();
    player.setTexture("idle"); // Сброс спрайта при остановке
  }

  // Проверка расстояния от игрока до триггера
  checkTriggerAndAct(compTrigger, toggleComp);
  checkTriggerAndAct(powerTrigger, togglePower);
}

function checkTriggerAndAct(trigger, action) {
  const distance = Phaser.Math.Distance.Between(player.x, player.y, trigger.x, trigger.y);
  if (distance < 50 && Phaser.Input.Keyboard.JustDown(eKey)) {
    action();
  }
}
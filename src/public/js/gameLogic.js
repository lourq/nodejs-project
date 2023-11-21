import socket from "/utils/socket.js";

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
let ventTrigger;

let gif;
let canMove = true;
let otherPlayersVisible = true;

let vents = {
  vent1: { x: 1350, y: 309, targetX: 1569, targetY: 602 },
  vent2: { x: 1569, y: 602, targetX: 1350, targetY: 309 },
  // добавьте больше шахт при необходимости
};

let otherPlayers = new Map();

function preload() {
  // this.load.image("background", "/assets/map/map.webp");
  this.load.image("background", "/assets/map/map.png");
  for (let i = 1; i < 7; i++) {
    this.load.image("walk" + i, "/assets/sprite/walk/Walk000" + i + ".png");
  }
  this.load.image("idle", "/assets/sprite/idle.png");
  this.load.image("comp", "/assets/icons/comp.png");
  this.load.image("power", "/assets/icons/power.png");
  this.load.image("vent", "/assets/icons/vent.png");
  for (let i = 1; i < 21; i++) {
    this.load.image("frame" + i, "/assets/load/frame" + i + ".png");
  }
}

function create() {
  // this.physics.world.setBounds(0, 0, 2000, 2000);

  this.physics.world.setBounds(0, 0, 2000, 1200);

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

  // Вы можете добавить столько стен, сколько вам нужно
  walls.create(985, 17, null).setSize(266, 20).setOffset(0, 0).setVisible(true);

  // right
  walls
    .create(541, 215, null)
    .setSize(366, 20)
    .setOffset(0, 0)
    .setVisible(true);
  walls.create(541, 150, null).setSize(5, 55).setOffset(0, 0).setVisible(true);

  // Включение коллизии между игроком и стенами
  this.physics.add.collider(player, walls);

  compTrigger = this.physics.add.sprite(1040, 164, "comp").setVisible(true);
  compTrigger.setDisplaySize(30, 30);

  powerTrigger = this.physics.add.sprite(1215, 597, "power").setVisible(true);
  powerTrigger.setDisplaySize(15, 10);

  // Добавление и настройка клавиши E
  eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

  gif = this.add.sprite(
    window.innerWidth / 2,
    window.innerHeight / 2,
    "frame1"
  );
  gif.setVisible(false);

  // Определение анимации
  const frames = [];
  for (let i = 1; i < 21; i++) {
    frames.push({ key: "frame" + i });
  }

  this.anims.create({
    key: "playGif",
    frames: frames,
    frameRate: 10,
    repeat: 0,
  });

  for (let key in vents) {
    let vent = vents[key];
    vent.sprite = this.physics.add
      .sprite(vent.x, vent.y, "vent")
      .setInteractive(true);
    vent.sprite.setDisplaySize(23, 17);
  }

  socket.on("playerMoved", (data) => {
    let otherPlayer = otherPlayers.get(data.id);

    if (otherPlayer) {
      // Интерполяция для плавного перемещения
      this.tweens.add({
        targets: otherPlayer,
        x: data.x,
        y: data.y,
        ease: "Linear",
        duration: 100,
      });

      // Обновление состояния анимации
      otherPlayer.isMoving = data.isMoving;
      otherPlayer.facingDirection = data.facingDirection; // Например, 'left' или 'right'
    } else {
      // Создание нового игрока, если он еще не существует
      let newPlayer = this.physics.add.sprite(data.x, data.y, "walk1");
      newPlayer.setDisplaySize(20, 26);
      newPlayer.isMoving = data.isMoving;
      newPlayer.facingDirection = data.facingDirection;
      otherPlayers.set(data.id, newPlayer);
    }
  });
}

function toggleComp() {
  window.location.href = "/menu";
}

function togglePower() {
  const cameraCenterX =
    this.cameras.main.worldView.x +
    this.cameras.main.width / 2 / this.cameras.main.zoom;
  const cameraCenterY =
    this.cameras.main.worldView.y +
    this.cameras.main.height / 2 / this.cameras.main.zoom;

  gif.setPosition(cameraCenterX, cameraCenterY);
  gif.setVisible(true).play("playGif");

  canMove = false;
  
  otherPlayers.forEach((otherPlayer) => {
    otherPlayer.setVisible(false);
  });
  otherPlayersVisible = false

  this.time.delayedCall(2500, () => {
    gif.setVisible(false);
    canMove = true; // Включаем возможность движения
    
    // Восстановить видимость всех других игроков
    otherPlayers.forEach((otherPlayer) => {
      otherPlayer.setVisible(true);
    });
    otherPlayersVisible = true
  }, [], this);
}

function checkVentAndAct(vent) {
  const distance = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    vent.sprite.x,
    vent.sprite.y // Используйте sprite.x и sprite.y для вентиляционной шахты
  );
  if (distance < 50 && Phaser.Input.Keyboard.JustDown(eKey)) {
    enterVent(vent, this); // Передайте this как второй параметр
  }
}

function checkTriggerAndAct(trigger, action) {
  const distance = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    trigger.x,
    trigger.y
  );
  if (distance < 50 && Phaser.Input.Keyboard.JustDown(eKey)) {
    action();
  }
}

// Функция для входа в вентиляцию
const enterVent = (vent, scene) => {
  canMove = false;
  player.setVisible(false);

  scene.time.delayedCall(
    500,
    () => {
      player.setPosition(vent.targetX, vent.targetY);
      player.setVisible(true);
      canMove = true;
    },
    [],
    scene
  );
};

function update() {
  if (canMove) {
    player.setVelocity(0);
    // Обработка движения игрока, если движение разрешено
    let isMoving = false;
    if (keys.left.isDown) {
      player.setVelocityX(-125);
      player.flipX = true;
      isMoving = true;
    } else if (keys.right.isDown) {
      player.setVelocityX(125);
      player.flipX = false;
      isMoving = true;
    }
    if (keys.up.isDown) {
      player.setVelocityY(-125);
      isMoving = true;
    } else if (keys.down.isDown) {
      player.setVelocityY(125);
      isMoving = true;
    }

    if (isMoving) {
      player.anims.play("walk", true);
      socket.emit("playerMove", { x: player.x, y: player.y, isMoving: true });
    } else {
      player.anims.stop();
      player.setTexture("idle");
      socket.emit("playerMove", { x: player.x, y: player.y, isMoving: false });
    }

    // Проверка расстояния от игрока до триггера
    checkTriggerAndAct(compTrigger, toggleComp);
    checkTriggerAndAct(powerTrigger, togglePower.bind(this));
    for (let key in vents) {
      checkVentAndAct.bind(this)(vents[key]);
    }
  } else {
    // Остановка движения игрока
    player.setVelocity(0);
    player.anims.stop();
    player.setTexture("idle");
  }

  // Отрисовка и анимация других игроков
  otherPlayers.forEach((otherPlayer) => {
    if (otherPlayersVisible) {
      // Если другие игроки должны быть видимы
      otherPlayer.setVisible(true);
      if (otherPlayer.isMoving) {
        otherPlayer.anims.play("walk", true);
        otherPlayer.flipX = otherPlayer.facingDirection === "left";
      } else {
        otherPlayer.anims.stop();
        otherPlayer.setTexture("idle");
      }
    } else {
      // Если другие игроки должны быть скрыты
      otherPlayer.setVisible(false);
    }
  });
}

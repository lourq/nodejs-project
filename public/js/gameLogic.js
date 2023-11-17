//#region global variable

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mapWidth = 3000; // Пример ширины карты
const mapHeight = 3000; // Пример высоты карты

const spriteWidth = 38;
const spriteHeight = 52;
const spritesName = [
  "Walk0001.png",
  "Walk0002.png",
  "Walk0003.png",
  "Walk0004.png",
  "Walk0005.png",
  "Walk0006.png",
];
const spriteIdle = new Image();
const spritesWalk = [];
let spriteMoveIndex = 0;

let cameraX = 0;
let cameraY = 0;

//#endregion

//#region init variable

spriteIdle.src = "/assets/sprite/idle.png";
spriteIdle.width = spriteWidth;
spriteIdle.height = spriteHeight;

//#endregion

//#region functions

const initSprites = (names, sprites) => {
  const path = "/assets/sprite/";

  // init sprites walk
  for (let i = 0; i < names.length; i++) {
    spritesWalk[i] = new Image();
    spritesWalk[i].src = path + "walk/" + names[i];
    spritesWalk[i].width = spriteWidth;
    spritesWalk[i].height = spriteHeight;
  }
};
const move = (spritesMove) => {
  if (spriteMoveIndex == spritesMove.length - 1) spriteMoveIndex = 0;
  character = spritesMove[spriteMoveIndex];
  spriteMoveIndex++;
};

const resetSprite = () => {
  character = spriteIdle;
  draw();
};

function centerCameraOnCharacter() {
  cameraX = characterX - canvas.width / 2 + spriteWidth / 2;
  cameraY = characterY - canvas.height / 2 + spriteHeight / 2;

  // Ограничение перемещения камеры, чтобы она не выходила за пределы карты
  cameraX = Math.min(Math.max(0, cameraX), mapWidth - canvas.width);
  cameraY = Math.min(Math.max(0, cameraY), mapHeight - canvas.height);
}


//#endregion

//#region init function

initSprites(spritesName, spritesWalk);

//#endregion

// Установка размеров холста на весь экран
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Создание объекта Image для спрайта персонажа
let character = spriteIdle;

// Начальное положение персонажа в центре экрана
let characterX = canvas.width / 2 - character.width / 2;
let characterY = canvas.height / 2 - character.height / 2;

//#region  Обработчик события нажатия клавиш

document.addEventListener("keyup", (event) => {
  const key = event.key;
  if (key === "w") {
    resetSprite();
  } else if (key === "s") {
    resetSprite();
  } else if (key === "a") {
    resetSprite();
  } else if (key === "d") {
    resetSprite();
  } else if ( key === "e") {
    // use
    console.log('use')
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const step = 13;
  if (key === "w") {
    characterY = Math.max(0, characterY - step);
  } else if (key === "s") {
    characterY = Math.min(mapHeight - spriteHeight, characterY + step);
  } else if (key === "a") {
    characterX = Math.max(0, characterX - step);
  } else if (key === "d") {
    characterX = Math.min(mapWidth - spriteWidth, characterX + step);
  }
  //#endregion

  centerCameraOnCharacter();
  move(spritesWalk);
  draw();
});

function drawMap(ctx, cameraX, cameraY) {
  // Здесь должна быть логика отрисовки тайлов карты или фона
  // в зависимости от текущего положения камеры.
  // Например, ты можешь иметь двумерный массив тайлов карты, 
  // и здесь ты бы перебирал только те тайлы, которые должны быть видны на экране.
  // Для простоты, здесь просто рисуем прямоугольник, который будет представлять карту.
  
  const visibleMapX = Math.max(0, cameraX); // Убедимся, что координаты не отрицательные
  const visibleMapY = Math.max(0, cameraY);
  
  // Для примера, пусть у нас будет карта просто как цветной прямоугольник
  ctx.fillStyle = '#3e5f74'; // цвет фона карты
  ctx.fillRect(
    -visibleMapX,
    -visibleMapY,
    mapWidth,
    mapHeight
  );
}

// Функция отрисовки персонажа
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // Сохраняем текущее состояние контекста перед трансформациями
  
  // Двигаем контекст так, чтобы персонаж был в центре канваса
  ctx.translate(
    canvas.width / 2 - characterX - spriteWidth / 2,
    canvas.height / 2 - characterY - spriteHeight / 2
  );
  
  // Отрисовка карты
  drawMap(ctx, cameraX, cameraY);
  
  // Отрисовка персонажа
  ctx.drawImage(
    character,
    characterX,
    characterY,
    spriteWidth,
    spriteHeight
  );
  
  ctx.restore(); // Восстанавливаем состояние контекста после трансформаций
}

// Первоначальная отрисовка
character.onload = draw;

// Обработчик события изменения размеров окна
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerCameraOnCharacter();
  draw();
});

// #region Notes

// const getImageByName = async (imageName) => {
//   return await fetch(`/assets/sprite/walk/${imageName}`)
//     .then((responce) => responce.blob())
//     .then((blob) => {
//       return blob;
//     });
// };

// const insertImageToArr = async() => {
//   for(let i = 0 ; i < spritesName.length ; i++){
//     const image = await getImageByName(spritesName[i])
//     sprites.push(image)
//     console.log(sprites)
//   }
// }

// insertImageToArr();

// let spriteIndex = 0;
// const changeImage = () => {
//   if(spriteIndex == sprites.length - 1) spriteIndex = 0
//   character.src = sprites[spriteIndex]
//   spriteIndex++;
// }
// setInterval(() => {
//   character.src = '/assets/sprite/idle.png';
// } , 100)

// Перемещение персонажа в центр после изменения размеров окна
// characterX = canvas.width / 2 - character.width / 2;
// characterY = canvas.height / 2 - character.height / 2;

//#endregion
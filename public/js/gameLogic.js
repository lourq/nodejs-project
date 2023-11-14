//#region global variable

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
    characterY -= step;
    move(spritesWalk);
  } else if (key === "s") {
    characterY += step;
    move(spritesWalk);
  } else if (key === "a") {
    characterX -= step;
    move(spritesWalk);
  } else if (key === "d") {
    characterX += step;
    move(spritesWalk);
  } 
  //#endregion
  
  // Ограничение передвижения персонажа, чтобы он не выходил за пределы карты
  if (characterX < 0) {
    characterX = 0;
  }
  if (characterX + character.width > canvas.width) {
    characterX = canvas.width - character.width;
  }
  if (characterY < 0) {
    characterY = 0;
  }
  if (characterY + character.height > canvas.height) {
    characterY = canvas.height - character.height;
  }

  draw();
});

// Функция отрисовки персонажа
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Отрисовка персонажа
  ctx.drawImage(
    character,
    characterX,
    characterY,
    character.width,
    character.height
  );
}

// Первоначальная отрисовка
character.onload = draw;

// Обработчик события изменения размеров окна
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

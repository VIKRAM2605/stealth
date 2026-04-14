import { gameLoop } from "./character.js";

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext('2d');

export const scale = 2;
const width = 512;
const height = 512;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.imageSmoothingEnabled = false;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

export const characterSpriteSheet = new Image();
characterSpriteSheet.src = "assets/inspector_spritesheet.png";

export const tileset = new Image();
tileset.src = "assets/tileset.png";

export const orbSheet = new Image();
orbSheet.src = "assets/orb_spritesheet.png";

export const crateSheet = new Image();
crateSheet.src = "assets/crates_spritesheet.png";

let loadedCount = 0;
const imageCount = 1;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("started")
        requestAnimationFrame(gameLoop);
    }
};

export const keys = {
    up: false,
    down: false,
    left: false,
    right: false
}

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const key = e.key.toLowerCase();
    switch (key) {
        case 'w':
            keys.up = true;
            return;
        case 's':
            keys.down = true;
            return;
        case 'a':
            keys.left = true;
            return;
        case 'd':
            keys.right = true;
            return;
    }
});

document.addEventListener('keyup', (e) => {
    e.stopPropagation();
    e.preventDefault();

    const key = e.key.toLowerCase();
    switch (key) {
        case 'w':
            keys.up = false;
            return;
        case 's':
            keys.down = false;
            return;
        case 'a':
            keys.left = false;
            return;
        case 'd':
            keys.right = false;
            return;
    }
})

characterSpriteSheet.onload = onImageLoad;
tileset.onload = onImageLoad;
orbSheet.onload = onImageLoad;
crateSheet.onload = onImageLoad;

console.log(canvas, ctx);
import { gameLoop } from "./character.js";
import { isTutorialActive, nextStep, startTutorial } from "./info.js";
import { isShopVisible, selectedUpgrade } from "./shop.js";

const pixelFont = new FontFace("PixelFont", "url(assets/04B_03__.TTF)");
pixelFont.load().then(f => document.fonts.add(f));

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext('2d');

export const scale = 2;
export const width = 512;
export const height = 512;

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

export const computerSheet = new Image();
computerSheet.src = "assets/computer_screen_large.png";

export const computerScreenSheet = new Image();
computerScreenSheet.src = "assets/computer_popup_spritesheet.png";

let loadedCount = 0;
const imageCount = 6;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("started")
        //requestAnimationFrame(gameLoop);
        startTutorial();
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
        case " ":
            if (isTutorialActive) nextStep();
            return;
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
        case 'arrowup':
            keys.up = true;
            return;
        case 'arrowdown':
            keys.down = true;
            return;
        case 'arrowleft':
            keys.left = true;
            return;
        case 'arrowright':
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
        case 'arrowup':
            keys.up = false;
            return;
        case 'arrowdown':
            keys.down = false;
            return;
        case 'arrowleft':
            keys.left = false;
            return;
        case 'arrowright':
            keys.right = false;
            return;
    }
});

document.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    nextStep();
});

document.addEventListener('keyup', (e) => {
    e.stopPropagation();
    e.preventDefault();

    const key = e.key.toLowerCase();
    // console.log(key);

    if (!isShopVisible) return;

    switch (key) {
        case 'e':
            selectedUpgrade('e');
            return;
        case 'f':
            selectedUpgrade('f');
            return;
        case 'escape':
            selectedUpgrade('esc');
    }
})

characterSpriteSheet.onload = onImageLoad;
tileset.onload = onImageLoad;
orbSheet.onload = onImageLoad;
crateSheet.onload = onImageLoad;
computerSheet.onload = onImageLoad;
computerScreenSheet.onload = onImageLoad;
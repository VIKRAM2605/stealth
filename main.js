import { gameLoop, initPlayer, isDead, toggleDeath } from "./character.js";
import { isTutorialActive, nextStep, startTutorial } from "./info.js";
import { resetMap, setLevel } from "./map.js";
import { resetOrbs } from "./money.js";
import { canUpgrade, isShopVisible, resetUpgrade, selectedUpgrade, toggleShowShop, updateUpgrade } from "./shop.js";
import './music.js';
import { resetMapOrbs } from "./orbs.js";
const pixelFont = new FontFace("PixelFont", "url(assets/04B_03__.TTF)");
pixelFont.load().then(f => document.fonts.add(f));

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext('2d');

export let scale;
export let width;
export let height;
const tileSize = 16;
const rows = 16;
const cols = 16;

function resizeCanvas() {

    // const availableWidth = window.innerWidth;
    // const availableHeight = window.innerHeight;

    scale = Math.floor(Math.min(window.innerWidth, window.innerHeight) / (tileSize * cols))

    const dpr = window.devicePixelRatio || 1;

    // width = Math.floor(availableWidth / scale);
    // height = Math.floor(availableHeight / scale);

    width = cols * scale * tileSize;
    height = rows * scale * tileSize;

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

export const timeBarSheet = new Image();
timeBarSheet.src = "assets/Health_Bar_Block.png";

export const extraSheet = new Image();
extraSheet.src = "assets/doodads_spritesheet.png";

export const portalSheet = new Image();
portalSheet.src = "assets/portal_spritesheet.png";

export const orbParticlesSheet = new Image();
orbParticlesSheet.src = "assets/orb_particles_spritesheet.png";

export const laserSheet = new Image();
laserSheet.src = "assets/lasers_spritesheet.png";

export const buttonsSheet = new Image();
buttonsSheet.src = "assets/button_large_spritesheet.png";

let loadedCount = 0;
const imageCount = 11;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("started")
        //requestAnimationFrame(gameLoop);
        initPlayer();
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
            return;
        case " ":
            const update = canUpgrade();
            if (!update) return;
            updateUpgrade();
            toggleShowShop();
            setLevel();
            return;
    }
});

document.addEventListener('keyup', (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isDead) return;

    const key = e.key.toLowerCase();

    switch (key) {
        case " ":
            resetMap();
            resetOrbs();
            toggleDeath();
            return;
    }
})

characterSpriteSheet.onload = onImageLoad;
tileset.onload = onImageLoad;
orbSheet.onload = onImageLoad;
crateSheet.onload = onImageLoad;
computerSheet.onload = onImageLoad;
computerScreenSheet.onload = onImageLoad;
extraSheet.onload = onImageLoad;
portalSheet.onload = onImageLoad;
orbParticlesSheet.onload = onImageLoad;
laserSheet.onload = onImageLoad;
buttonsSheet.onload = onImageLoad;
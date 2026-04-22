import { player } from "./character.js";
import { collidesWithObject, collidesWithWall } from "./collision.js";
import { bot1Sheet, bot2Sheet, bot3Sheet, ctx, scale } from "./main.js"
import { currentLevel, getCurrentMap } from "./map.js";
import { randomInt } from "./orbs.js";

//need to implement bot's feature.

const botSprite = {
    "down": {
        frames: [
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 }
        ]
    },
    "up": {
        frames: [
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 2, col: 4 }
        ]
    },
    "left": {
        frames: [
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 3, col: 3 },
            { row: 3, col: 4 }
        ]
    },
    "right": {
        frames: [
            { row: 4, col: 1 },
            { row: 4, col: 2 },
            { row: 4, col: 3 },
            { row: 4, col: 4 }
        ]
    },
}

const botDeathSprite = {
    "down": {
        frames: [
            { row: 5, col: 1 },
            { row: 5, col: 2 },
            { row: 5, col: 3 },
        ]
    },
    "up": {
        frames: [
            { row: 5, col: 4 },
            { row: 6, col: 1 },
            { row: 6, col: 2 }
        ]
    },
    "left": {
        frames: [
            { row: 6, col: 3 },
            { row: 6, col: 4 },
            { row: 7, col: 1 }
        ]
    },
    "right": {
        frames: [
            { row: 7, col: 2 },
            { row: 7, col: 3 },
            { row: 7, col: 4 }
        ]
    }
}

const botLevelMap = {
    1: [
        { row: 2, col: 4, sprite: null, currentFacing: "down", isStanding: true, isStun: false, isStunTimer: 0, isChasing: false, frameTimer: 0, frameIndex: 0 },
    ]
};

const tile = 16;
let maxStunTime = 2;
const maxFrameTimer = 0.15;
let botSpeed = 80;
let botEyeSight = 4 //=> radius

const availableColor = ["yellow", "orange", "white"];
const colorMappedWithSpriteSheet = {
};

export function initBotSheet() {
    colorMappedWithSpriteSheet["yellow"] = bot1Sheet;
    colorMappedWithSpriteSheet["orange"] = bot2Sheet;
    colorMappedWithSpriteSheet["white"] = bot3Sheet;
}

export function pickRandomSpriteForBot() {
    const bots = botLevelMap[currentLevel] ?? [];
    const tileSize = 16 * scale;

    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];

        const randomIndex = randomInt(0, availableColor.length - 1);

        bot.sprite = availableColor[randomIndex];
    }
}

export function updateBot(delta) {
    const bots = botLevelMap[currentLevel];
    const tileSize = tile * scale;
    const chaseRadius = botEyeSight * tileSize;
    const map = getCurrentMap();

    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];

        if (bot.x === undefined) {
            bot.x = bot.col * tileSize;
            bot.y = bot.row * tileSize;
        }

        if (bot.isStun) {
            bot.isStunTimer += delta;
            bot.frameTimer += delta;
            if (bot.frameTimer > maxFrameTimer) {
                bot.frameTimer = 0;
                const frames = botDeathSprite[bot.currentFacing].frames;
                bot.frameIndex = (bot.frameIndex + 1) % frames.length;
            }
            if (bot.isStunTimer > maxStunTime) {
                bot.isStun = false;
                bot.frameIndex = 0;
                bot.frameTimer = 0;
                bot.isStunTimer = 0;
            }
            continue;
        }

        const dx = player.x - bot.x;
        const dy = player.y - bot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        bot.isChasing = dist < chaseRadius;
        bot.isStanding = !bot.isChasing;

        if (bot.isStanding) {
            bot.frameIndex = 0;
            bot.frameTimer = 0;
            continue;
        }

        if (dist > 1) {
            const nx = dx / dist;
            const ny = dy / dist;

            bot.x += nx * botSpeed * delta;
            if (collidesWithWall(map, bot.x, bot.y, tileSize, tileSize) || collidesWithObject(bot.x, bot.y, tileSize, tileSize)) {
                bot.x -= nx * botSpeed * delta;
            }

            bot.y += ny * botSpeed * delta;
            if (collidesWithWall(map, bot.x, bot.y, tileSize, tileSize) || collidesWithObject(bot.x, bot.y, tileSize, tileSize)) {
                bot.y -= ny * botSpeed * delta;
            }

            if (Math.abs(dx) > Math.abs(dy)) {
                bot.currentFacing = dx > 0 ? "right" : "left";
            } else {
                bot.currentFacing = dy > 0 ? "down" : "up";
            }
        }

        bot.frameTimer += delta;
        if (bot.frameTimer > maxFrameTimer) {
            bot.frameIndex = (bot.frameIndex + 1) % botSprite[bot.currentFacing].frames.length;
            bot.frameTimer = 0;
        }

    }
}

export function drawBot() {
    const bots = botLevelMap[currentLevel];
    const tileSize = tile * scale;

    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];

        if (bot.x === undefined) continue;

        const sheet = colorMappedWithSpriteSheet[bot.sprite];
        let sprite;
        if (bot.isStun) {
            sprite = botDeathSprite[bot.currentFacing];
        } else {
            sprite = botSprite[bot.currentFacing];
        }
        const frames = sprite.frames;
        const frame = frames[bot.frameIndex];

        ctx.drawImage(
            sheet,
            (frame.col - 1) * tile, (frame.row - 1) * tile, tile, tile,
            bot.x, bot.y, tileSize, tileSize
        );
    }
}


import { ctx, laserSheet, scale } from "./main.js";
import { currentLevel } from "./map.js";

const tileSize = 16;

const laserSprite = {
    leftStart: {
        frames: [
            { row: 4, col: 1 },
            { row: 4, col: 2 }
        ]
    },
    rightEnd: {
        frames: [
            { row: 5, col: 1 },
            { row: 5, col: 2 }
        ]
    },
    middle: {
        frames: [
            { row: 6, col: 1 },
            { row: 6, col: 2 }
        ]
    }
};

export const laserLevelMap = {
    1: [
        { row: 3, col: 4, sprite: "leftStart", frameIndex: 0, frameTimer: 0 }, { row: 3, col: 5, sprite: "middle", frameIndex: 0, frameTimer: 0 }, { row: 3, col: 6, sprite: "rightEnd", frameIndex: 0, frameTimer: 0 }
    ]
}

const maxLaserFrameTimer = 0.3;

export function drawLaser() {
    const lasers = laserLevelMap[currentLevel];
    const laserSize = tileSize * scale;

    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        const sprite = laserSprite[laser.sprite].frames[laser.frameIndex];

        ctx.drawImage(
            laserSheet,
            (sprite.col - 1) * tileSize, (sprite.row - 1) * tileSize, tileSize, tileSize,
            laser.col * laserSize, laser.row * laserSize, laserSize, laserSize
        );
    }
}

export function updateLaser(delta) {
    const lasers = laserLevelMap[currentLevel];

    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        const sprite = laserSprite[laser.sprite];

        laser.frameTimer += delta;
        if (laser.frameTimer > maxLaserFrameTimer) {
            laser.frameTimer = 0;
            laser.frameIndex = (laser.frameIndex + 1) % sprite.frames.length;
        }
    }
}
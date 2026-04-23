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
    },
    offLeft: {
        frames: [
            { row: 8, col: 1 },
        ]
    },
    offMiddle: {
        frames: [
            { row: 8, col: 2 }
        ]
    },
    offRight: {
        frames: [
            { row: 9, col: 1 }
        ]
    }

};

export const laserLevelMap = {
    3: [
        { id: "laser1_lvl3", row: 5, col: 4, sprite: "leftStart", frameIndex: 0, frameTimer: 0, off: false }, { id: "laser1_lvl3", row: 5, col: 5, sprite: "middle", frameIndex: 0, frameTimer: 0, off: false }, { id: "laser1_lvl3", row: 5, col: 6, sprite: "rightEnd", frameIndex: 0, frameTimer: 0, off: false },
        { id: "laser2_lvl3", row: 5, col: 11, sprite: "leftStart", frameIndex: 0, frameTimer: 0, off: false }, { id: "laser2_lvl3", row: 5, col: 12, sprite: "rightEnd", frameIndex: 0, frameTimer: 0, off: false },

    ],
    4: [
        { id: "laser1_lvl4", row: 3, col: 7, sprite: "leftStart", frameIndex: 0, frameTimer: 0, off: false }, { id: "laser1_lvl4", row: 3, col: 8, sprite: "rightEnd", frameIndex: 0, frameTimer: 0, off: false },
        { id: "laser2_lvl4", row: 10, col: 7, sprite: "leftStart", frameIndex: 0, frameTimer: 0, off: false }, { id: "laser2_lvl4", row: 10, col: 8, sprite: "rightEnd", frameIndex: 0, frameTimer: 0, off: false },

    ]
}

const maxLaserFrameTimer = 0.3;

export function turnOffLaser(id) {
    const lasers = laserLevelMap[currentLevel] ?? [];
    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        if (laser.id === id) {
            if (laser.sprite === "leftStart") laser.sprite = "offLeft";
            else if (laser.sprite === "rightEnd") laser.sprite = "offRight";
            else if (laser.sprite === "middle") laser.sprite = "offMiddle";
            laser.frameIndex = 0;
            laser.frameTimer = 0;
            laser.off = true;
        }
    }
}

export function resetLasers() {
    const lasers = laserLevelMap[currentLevel] ?? [];
    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        if (laser.sprite === "offLeft") laser.sprite = "leftStart";
        else if (laser.sprite === "offRight") laser.sprite = "rightEnd";
        else if (laser.sprite === "offMiddle") laser.sprite = "middle";
        laser.frameIndex = 0;
        laser.frameTimer = 0;
        laser.off = false;
    }
}

export function drawLaser() {
    const lasers = laserLevelMap[currentLevel] ?? [];
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
    const lasers = laserLevelMap[currentLevel] ?? [];

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
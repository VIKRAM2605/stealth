import { ctx, orbSheet, scale } from "./main.js";
import { currentLevel } from "./map.js";

const tileSize = 16;

const orbsSprite = {
    0: { row: 1, col: 1 },
    1: { row: 1, col: 2 },
    2: { row: 1, col: 3 },
    3: { row: 1, col: 4 },
    4: { row: 1, col: 5 },
    5: { row: 1, col: 6 },
    6: { row: 1, col: 7 },
    7: { row: 1, col: 8 },
    8: { row: 1, col: 9 },
    9: { row: 1, col: 10 }
};

const frameTimer = 0.20;
export const orbsList = {
    1: [
        {
            id: "orb1_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 2,
            col: 2
        },
        {
            id: "orb2_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 5,
            col: 5
        }
    ],
    2: [
        {
            id: "orb1_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 2,
            col: 2
        },
        {
            id: "orb2_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 10,
            col: 12
        }
    ]
};

export function updateOrbs(delta) {
    for (let i = 0; i < orbsList[currentLevel].length; i++) {

        if (orbsList[currentLevel][i].collected) continue;

        orbsList[currentLevel][i].orbTime += delta;
        if (orbsList[currentLevel][i].orbTime >= frameTimer) {
            orbsList[currentLevel][i].orbIndex++;
            if (orbsList[currentLevel][i].orbIndex >= Object.keys(orbsSprite).length) orbsList[currentLevel][i].orbIndex = 0;
            orbsList[currentLevel][i].orbTime = 0;
        }

        drawOrb(orbsList[currentLevel][i].row, orbsList[currentLevel][i].col, orbsList[currentLevel][i].orbIndex);
    }
};


export function drawOrb(row, col, index) {
    const pos = orbsSprite[index];
    const orbSize = tileSize * (scale - 1);
    const offset = (tileSize * scale - orbSize) / 2;
    ctx.drawImage(
        orbSheet,
        (pos.col - 1) * tileSize, (pos.row - 1) * tileSize, tileSize, tileSize,
        col * tileSize * scale + offset, row * tileSize * scale + offset, orbSize, orbSize
    );
};
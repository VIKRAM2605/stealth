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
            row: 5,
            col: 10
        },
        {
            id: "orb2_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 5,
            col: 5
        },
        {
            id: "orb3_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 10,
            col: 12
        },
        {
            id: "orb4_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 1,
            col: 14
        },
        {
            id: "orb4_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 13,
            col: 1
        },
        {
            id: "orb5_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 9,
            col: 3
        },
        {
            id: "orb6_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 8,
            col: 13
        },
        {
            id: "orb7_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 3,
            col: 7
        },
        {
            id: "orb8_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 13,
            col: 8
        }
    ],
    2: [
        {
            id: "orb1_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 3,
            col: 2
        },
        {
            id: "orb2_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 10,
            col: 12
        },
        {
            id: "orb3_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:8,
            col:6   
        },
        {
            id: "orb4_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:1,
            col:14
        },
        {
            id: "orb5_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:3,
            col:11
        },
        {
            id: "orb6_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:13,
            col:1
        },
        {
            id: "orb7_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:6,
            col:7
        },
        {
            id: "orb8_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:4,
            col:4
        },
        {
            id: "orb9_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:11,
            col:14
        },
        {
            id: "orb10_lvl2",
            orbIndex:0,
            orbTime:0,
            collected:false,
            row:12,
            col:8
        }
    ]
};

export function resetMapOrbs() {
    for (let i = 0; i < orbsList[currentLevel].length; i++) {
        orbsList[currentLevel][i].collected = false;
    }
}

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
import { ctx, portalSheet, scale } from "./main.js";
import { currentLevel } from "./map.js";

const portalSprite = [{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }];
const tile = 16;

export const portalLevelMap = {
    1: [
        {
            id: "portal1_lvl_1",
            animIndex: 0,
            row: 5,
            col: 7,
            to: "portal2_lvl_1"
        },
        {
            id: "portal2_lvl_1",
            animIndex: 0,
            row: 5,
            col: 11,
            to: "portal1_lvl_1"
        }
    ]
}

export function drawPortal() {
    const portals = portalLevelMap[currentLevel];
    const tileSize = tile * scale;
    for (let i = 0; i < portals.length; i++) {

        const portal = portals[i];
        // console.log(portal);

        ctx.drawImage(
            portalSheet,
            (portalSprite[portal.animIndex].col - 1) * tile, (portalSprite[portal.animIndex].row - 1) * tile, tile, tile,
            portal.col * tileSize, portal.row * tileSize, tileSize, tileSize
        );

    }
}

let animTimer = 0;

const maxAnimTime = 0.3;
const maxFrames = 6;

export function animatePortal(delta, portalIndex) {
    animTimer += delta;
    if (animTimer >= maxAnimTime) {
        animTimer -= maxAnimTime;
        portalLevelMap[currentLevel][portalIndex].animIndex += 1;
        if (portalLevelMap[currentLevel][portalIndex].animIndex >= maxFrames) {
            portalLevelMap[currentLevel][portalIndex].animIndex = 0;
        }
    }
    for (let i = 0; i < portalLevelMap[currentLevel].length; i++) {
        if (portalIndex === i) continue;
        portalLevelMap[currentLevel][i].animIndex = 0;
    }
}

export function resetAnimationTimer() {
    animTimer = 0;
    for (let i = 0; i < portalLevelMap[currentLevel].length; i++) {
        portalLevelMap[currentLevel][i].animIndex = 0;
    }
}
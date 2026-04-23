import { ctx, portalSheet, scale } from "./main.js";
import { currentLevel } from "./map.js";

const portalSprite = [{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }];
const tile = 16;

export const portalLevelMap = {
    3: [
        { id: "portal1_lvl_3", animIndex: 0, row: 1, col: 14, to: "portal2_lvl_3" },
        { id: "portal2_lvl_3", animIndex: 0, row: 13, col: 1, to: "portal1_lvl_3" }
    ],
    4: [
        { id: "portal1_lvl4", animIndex: 0, row: 2, col: 1, to: "portal4_lvl4" },
        { id: "portal2_lvl4", animIndex: 0, row: 2, col: 14, to: "portal3_lvl4" },
        { id: "portal3_lvl4", animIndex: 0, row: 11, col: 1, to: "portal2_lvl4" },
        { id: "portal4_lvl4", animIndex: 0, row: 11, col: 14, to: "portal1_lvl4" },
    ],
    5: [
        { id: "portal1_lvl5", animIndex: 0, row: 6, col: 1, to: "portal2_lvl5" },
        { id: "portal2_lvl5", animIndex: 0, row: 6, col: 14, to: "portal1_lvl5" },
    ],
}

export function drawPortal() {
    const portals = portalLevelMap[currentLevel] ?? [];
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
    for (let i = 0; i < (portalLevelMap[currentLevel] ?? []).length; i++) {
        portalLevelMap[currentLevel][i].animIndex = 0;
    }
}
import { ctx, extraSheet, scale } from "./main.js";
import { currentLevel } from "./map.js"

const warningTapeSprite = { row: 4, col: 1 };

const tile = 16;

const warningTapeMap = {
    1: [{ row: 14, col: 7 }, { row: 14, col: 8 }],
    2: [{ row: 14, col: 2 }, { row: 14, col: 3 }]
}

export function drawWarningTape() {
    const tapeMap = warningTapeMap[currentLevel];
    const tileSize = tile * scale;
    for (let i = 0; i < tapeMap.length; i++) {
        ctx.drawImage(
            extraSheet,
            (warningTapeSprite.col - 1) * tile, (warningTapeSprite.row - 1) * tile, tile, tile,
            tapeMap[i].col * tileSize, tapeMap[i].row * tileSize, tileSize, tileSize
        );
    }
}
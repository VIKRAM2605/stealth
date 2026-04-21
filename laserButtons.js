import { buttonsSheet, ctx, scale } from "./main.js";
import { currentLevel } from "./map.js"

const tile = 16;
const buttonSprite = {
    "on": { row: 1, col: 1 },
    "off": { row: 1, col: 2 }
}

export const buttonLevelMap = {
    1: [
        { id: "button1_lvl1", off: "laser1_lvl1", row: 3, col: 8, sprite: "off" },
    ]
}

export function updateButton(id) {
    const buttons = buttonLevelMap[currentLevel] ?? [];

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if (button.id === id) button.sprite = "on";
    }
}

export function resetButtons() {
    const buttons = buttonLevelMap[currentLevel] ?? [];

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].sprite = "off";
    }
}

export function drawButtons() {
    const buttons = buttonLevelMap[currentLevel] ?? [];
    const tileSize = tile * scale;
    const buttonSize = tileSize * 0.7;
    const offsetX = (tileSize - buttonSize) / 2 + scale * 0.5;
    const offsetY = (tileSize - buttonSize) / 2 + scale * 0.5;

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const sprite = buttonSprite[button.sprite];

        ctx.drawImage(
            buttonsSheet,
            (sprite.col - 1) * tile, (sprite.row - 1) * tile, tile, tile,
            button.col * tileSize + offsetX, button.row * tileSize + offsetY, buttonSize, buttonSize
        );
    }
}
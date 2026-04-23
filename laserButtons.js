import { buttonsSheet, ctx, scale } from "./main.js";
import { currentLevel } from "./map.js"

const tile = 16;
const buttonSprite = {
    "off": { row: 1, col: 1 },
    "on": { row: 1, col: 2 }
}

export const buttonLevelMap = {
    3: [
        { id: "button1_lvl3", off: "laser1_lvl3", row: 6, col: 3, sprite: "off" },
        { id: "button2_lvl3", off: "laser2_lvl3", row: 6, col: 13, sprite: "off" },
    ],
    4: [
        { id: "button1_lvl4", off: "laser1_lvl4", row: 4, col: 9, sprite: "off" },
        { id: "button2_lvl4", off: "laser2_lvl4", row: 9, col: 9, sprite: "off" },
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
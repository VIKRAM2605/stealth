import { deathSprite } from "./character.js";
import { canvas, characterSpriteSheet, computerSheet, ctx, height, scale, width } from "./main.js";

let counter = 0;
const frameTimer = 0.15;
let timePassed = 0;

export function renderDeathScreen(delta) {
    const computerWidth = 240 * scale;
    const computerHeight = 192 * scale;
    const computerX = (width / 2) - (computerWidth / 2);
    const computerY = (height / 2) - (computerHeight / 2);

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const cx = computerX + computerWidth / 2;
    const cy = computerY + computerHeight / 2;

    ctx.fillStyle = "#F44336";
    ctx.font = `${Math.round(25 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", cx, computerY + Math.round(83 * scale));

    const spriteAnim = deathSprite["down"]["frames"];

    timePassed += delta;

    if (timePassed >= frameTimer) {
        timePassed = 0;
        counter += 1;
        if (counter >= spriteAnim.length) {
            counter = 0;
        }
    }

    const sprite = spriteAnim[counter];
    const spriteRealSize = 16;
    const scaledSize = spriteRealSize * scale;

    ctx.drawImage(
        characterSpriteSheet,
        (sprite.col - 1) * spriteRealSize, (sprite.row - 1) * spriteRealSize, spriteRealSize, spriteRealSize,
        cx - (scaledSize) / 2, cy - (scaledSize) / 2, scaledSize, scaledSize
    );

    ctx.fillStyle = "#6b728f";
    ctx.font = `${Math.round(8 * scale)}px PixelFont`;
    ctx.fillText("Click 'Space' To 'Retry'", cx, computerY + computerHeight - Math.round(33 * scale));
}
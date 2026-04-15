import { deathSprite } from "./character.js";
import { canvas, characterSpriteSheet, computerSheet, ctx, height, width } from "./main.js";

let counter = 0;
const frameTimer = 0.15;
let timePassed = 0;
// export function updateDeathSprite() {

// }

export function renderDeathScreen(delta) {
    const computerWidth = 240 * 2;
    const computerHeight = 192 * 2;
    const computerX = (width / 2) - (computerWidth / 2);
    const computerY = (height / 2) - (computerHeight / 2);

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    ctx.fillStyle = "#F44336";
    ctx.font = "40px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", computerX + computerWidth / 2, computerY + 170);

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

    ctx.drawImage(
        characterSpriteSheet,
        (sprite.col - 1) * 16, (sprite.row - 1) * 16, 16, 16,
        (computerX + computerWidth / 2) - (16), (computerY + computerHeight / 2) - (16), 32, 32
    );

    ctx.fillStyle = "#6b728f";
    ctx.font = "10px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("Click 'Space' To 'Retry'", computerX + computerWidth / 2, computerY + computerHeight - 80);
}
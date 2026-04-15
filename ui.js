import { canvas, ctx, orbSheet, width } from "./main.js";
import { getCurrentOrbsCount } from "./money.js";

export function drawUi() {
    drawOrbsTotal();
}

export function drawOrbsTotal() {

    const x = width - 80;
    const y = 25;

    ctx.drawImage(
        orbSheet,
        0, 0, 16, 16,
        x, y - 10, 16, 16
    );

    ctx.fillStyle = "#dde3ff";
    ctx.font = "10px PixelFont";
    ctx.textAlign = "left";
    ctx.fillText(`${getCurrentOrbsCount()}`, x + 20, y + 2.5);


}
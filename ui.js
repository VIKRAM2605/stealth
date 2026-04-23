import { player } from "./character.js";
import { canvas, ctx, orbSheet, scale, width } from "./main.js";
import { getCurrentOrbsCount } from "./money.js";

export const bars = {
    full: ""
}

export function drawUi() {
    drawRemainingTime();
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

export function drawRemainingTime() {
    const time = Math.max(0, player.timeLeft);
    const totalTime = 20 + player.timeBought;

    const fillPercentage = time / totalTime;

    const maxBarWidth = Math.round(60 * scale);
    const barHeight = Math.round(6 * scale);
    const barY = Math.round(8 * scale);
    const gap = Math.round(4 * scale);

    const text = "Time Remaining:";
    ctx.font = `${Math.round(8 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle"

    const textWidth = ctx.measureText(text).width;
    const totalWidth = textWidth + gap + maxBarWidth;
    const startX = (width / 2) - (totalWidth / 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, startX, barY + (barHeight) / 2);

    const barX = startX + textWidth + gap;

    ctx.fillStyle = "#333333";
    ctx.fillRect(barX, barY, maxBarWidth, barHeight);

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(barX, barY, maxBarWidth * fillPercentage, barHeight);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.round(1 * scale);
    ctx.strokeRect(barX, barY, maxBarWidth, barHeight);

    ctx.textBaseline = "alphabetic";

}
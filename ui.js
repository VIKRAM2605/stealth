import { player } from "./character.js";
import { canvas, ctx, orbSheet, width } from "./main.js";
import { getCurrentOrbsCount } from "./money.js";

export const bars = {
    full: ""
}

export function drawUi() {
    //drawOrbsTotal();
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

    const maxBarWidth = 100;
    const barHeight = 10;
    const barY = 15;
    const gap = 5;

    const text = "Time Remaining:";
    ctx.font = "15px PixelFont";
    ctx.textAlign = "left";

    const textWidth = ctx.measureText(text).width;

    const totalWidth = textWidth + gap + maxBarWidth;
    const startX = (width / 2) - (totalWidth / 2);

    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle"
    ctx.fillText(text, startX, barY + (barHeight) / 2);

    const barX = startX + textWidth + gap;

    ctx.fillStyle = "#333333";
    ctx.fillRect(barX, barY, maxBarWidth, barHeight);

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(barX, barY, maxBarWidth * fillPercentage, barHeight);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, maxBarWidth, barHeight);

    ctx.textBaseline = "alphabetic";

}
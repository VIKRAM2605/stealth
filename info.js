import { gameLoop } from "./character.js";
import { canvas, computerSheet, ctx, height, scale, width } from "./main.js";

const steps = [
    {
        main: "WELCOME",
        title: "You Are A Thief!",
        para: "Steal As Much As You Can,As Fast As You Can!",
        info: "MOVE - WASD / ARROWS"
    },
    {
        main: "CAREFUL",
        title: "More Loot = Bigger Bag!",
        para: "Don't Get Too Greedy.",
        info: "Watch Your Load!!!"
    },
    {
        main: "MIND THE TIME",
        title: "You Start With 20 Seconds.",
        para: "Each Level Gets Harder!",
        info: "Don't Be Slow!!!"
    },
    {
        main: "UPGRADES",
        title: "Upgrades Help You Last Longer",
        para: "Buy Them Between Levels!",
        info: "Spend Wisely!!!"
    }
];

let currentStep = 0;
export let isTutorialActive = false;

export function nextStep() {
    currentStep += 1;
    processStep(steps[currentStep])
};

export function startTutorial() {
    processStep(steps[currentStep]);
    isTutorialActive = true;
}

export function processStep(step) {
    if (!step) {
        endTutorial();
        return;
    }
    drawTutorial(step);
}

export function endTutorial() {
    currentStep = 0;
    isTutorialActive = false;
    requestAnimationFrame(gameLoop);
}

export function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = "";
    for (let i = 0; i < words.length; i++) {
        const test = line + words[i] + " ";
        if (ctx.measureText(test).width > maxWidth && i > 0) {
            ctx.fillText(line, x, y);
            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = test;
        }
    }
    ctx.fillText(line, x, y);
    return y;
}

export function drawTutorial(step) {

    const computerWidth = 240 * 1.5;
    const computerHeight = 192 * 1.5;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const screenX = computerX + 45;
    const screenY = computerY + 35;
    const screenW = computerWidth - 90;
    const screenH = computerHeight - 80;
    const cx = screenX + screenW / 2;

    ctx.textAlign = "center";
    let y = screenY + 50;

    ctx.fillStyle = "#c8a96e";
    ctx.font = "35px PixelFont";
    ctx.fillText(step.main, cx, y);
    y += 40;

    ctx.fillStyle = "#dde3ff";
    ctx.font = "18px PixelFont";
    y = wrapText(step.title, cx, y, screenW - 10, 12) + 25;

    if (step.para) {
        ctx.fillStyle = "#9aa0c0";
        ctx.font = "14px PixelFont";
        y = wrapText(step.para, cx, y, screenW - 10, 11) + 11;
    }

    ctx.fillStyle = "#c8a96e";
    ctx.font = "12px PixelFont";
    ctx.fillText(step.info, cx, screenY + screenH - 20);

    ctx.fillStyle = "#6b728f";
    ctx.font = "10px PixelFont";
    ctx.fillText("[PRESS SPACE/CLICK TO CONTINUE]", cx, screenY + screenH - 4);
}
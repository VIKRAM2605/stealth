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
    },
    // {
    //     main: "ZOOM",
    //     title: "Make Your Game Bigger With Zoom.",
    //     para: "Zooming In Increases The Overall Size Of The Game For Better Visibility And Experience. Use CTRL + Scroll Wheel To Zoom In Or Just Using Browser Zoom In/Out Option.",
    //     info: "Adjust It Based On Your Preference."
    // },
    {
        main: "Player's Weight",
        title: "Mind the Player's Extra Body Weight",
        para: "More the Orbs You Collect More The Player Will Get Slowed Down Due To Weight Of the Orbs.",
        info: "Mind!!!"
    },
    {
        main: "Lasers",
        title: "About The Laser",
        para: "Lasers Will Stun You For 2 Seconds If You Touch Them. Turn Them Off By The Button That Is Near To It BY stepping On the Button For 0.5 Seconds.",
        info: "Watch Out For The Lasers And Buttons"
    },
    {
        main: "Portals",
        title: "About The Portal",
        para: "Portal Will Take You To The Partner Portal Which May Be Far Apart From Each Other Or Close To Each Other. Takes 2 Seconds To Teleport To The Other Portal And 1 Seconds CoolDown Period Until Then You Can't Teleport.",
        info: "Plan Out The Path"
    },
    // {
    //     main: "Bots",
    //     title: "About The Bot",
    //     para: "Bots will Spawned at Particular Places at the start of the level and They will chase you if you get caught in their eyesight.",
    //     info: "Watch Out For Them And Maintain A Safe Distance"
    // },
    // {
    //     main: "Darts",
    //     title:"About The Darts",
    //     para:"Darts Will help you stun the bots for 2 seconds. Buy upgrades to increase the stun time. Remaining Darts can be carried over to the next level.",
    //     info: "Use carefully as limited amount of darts can be given at each level. "
    // }
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
            ctx.fillText(line.trim(), x, y);
            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = test;
        }
    }
    ctx.fillText(line.trim(), x, y);
    return y;
}

export function drawTutorial(step) {

    const computerWidth = 240 * scale;
    const computerHeight = 192 * scale;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const screenX = computerX + 45 * scale;
    const screenY = computerY + 30 * scale;
    const screenW = computerWidth - 80 * scale;
    const screenH = computerHeight - 50 * scale;
    const cx = screenX + screenW / 2;

    ctx.textAlign = "center";
    let y = screenY + 15 * scale;

    ctx.fillStyle = "#c8a96e";
    ctx.font = `${Math.round(20 * scale)}px PixelFont`;
    ctx.fillText(step.main, cx, y);
    y += Math.round(15 * scale);

    ctx.fillStyle = "#dde3ff";
    ctx.font = `${Math.round(10 * scale)}px PixelFont`;
    const titleLineHeight = Math.round(11 * scale);
    y = wrapText(step.title, cx, y, screenW, titleLineHeight) + Math.round(16 * scale);

    if (step.para) {
        ctx.fillStyle = "#9aa0c0";
        ctx.font = `${Math.round(8 * scale)}px PixelFont`;
        const paraLineHeight = Math.round(11 * scale);
        y = wrapText(step.para, cx, y, screenW, paraLineHeight) + Math.round(8 * scale);
    }

    ctx.fillStyle = "#c8a96e";
    ctx.font = `${Math.round(7 * scale)}px PixelFont`;
    ctx.fillText(step.info, cx, screenY + screenH - Math.round(20 * scale));

    ctx.fillStyle = "#6b728f";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.fillText("[PRESS SPACE/CLICK TO CONTINUE]", cx, screenY + screenH - Math.round(10 * scale));
}
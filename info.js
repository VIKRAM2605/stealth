import { gameLoop } from "./character.js";
import { canvas, computerSheet, ctx, height, scale, width } from "./main.js";

//need to adjust it based on scale

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
    {
        main: "Bots",
        title: "About The Bot",
        para: "Bots will Spawned at Particular Places at the start of the level and They will chase you if you get caught in their eyesight.",
        info: "Watch Out For Them And Maintain A Safe Distance"
    },
    {
        main: "Darts",
        title:"About The Darts",
        para:"Darts Will help you stun the bots for 2 seconds. Buy upgrades to increase the stun time. Remaining Darts can be carried over to the next level.",
        info: "Use carefully as limited amount of darts can be given at each level. "
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

    const computerWidth = 240 * scale;
    const computerHeight = 192 * scale;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const screenX = computerX + 45;
    const screenY = computerY + 80;
    const screenW = computerWidth - 80;
    const screenH = computerHeight - 80;
    const cx = screenX + screenW / 2;

    ctx.textAlign = "center";
    let y = screenY + 50;

    ctx.fillStyle = "#c8a96e";
    ctx.font = "60px PixelFont";
    ctx.fillText(step.main, cx, y);
    y += 40;

    ctx.fillStyle = "#dde3ff";
    ctx.font = "25px PixelFont";
    y = wrapText(step.title, cx, y, screenW - 10, 12) + 45;

    if (step.para) {
        ctx.fillStyle = "#9aa0c0";
        ctx.font = "20px PixelFont";
        y = wrapText(step.para, cx, y, screenW - 30, 11) + 11;
    }

    ctx.fillStyle = "#c8a96e";
    ctx.font = "16px PixelFont";
    ctx.fillText(step.info, cx, screenY + screenH - 110);

    ctx.fillStyle = "#6b728f";
    ctx.font = "18px PixelFont";
    ctx.fillText("[PRESS SPACE/CLICK TO CONTINUE]", cx, screenY + screenH - 90);
}
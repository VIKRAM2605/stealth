import { player } from "./character.js";
import { wrapText } from "./info.js";
import { computerScreenSheet, computerSheet, ctx, height, orbSheet, scale, width } from "./main.js";
import { getCurrentOrbsCount } from "./money.js";
import { randomInt } from "./orbs.js";

// need to update based on scale

export let isShopVisible = false;

export let upgradeCost = 4;

const upgradesAvailable = {
    "Time Surge": "Increase Total Time By 1 Seconds(stacks).",
    "Strength Surge": "Halve One Orb's Weigth(stacks).",
    "Stun Break": "Reduce Stun Time By 5% of Current Stun Time.",
    "Orb Magnet": "Increases The Orb Collection Area By 8% Of Current Area.",
    "Bot Slower": "Makes The Bot Go 7% Slower Than Current Speed. "
}

const displayUpgrades = []

let upgradeSelected = "";

let errorMessage = "";

export function toggleShowShop() {
    isShopVisible = !isShopVisible;
    if (isShopVisible) pickRandomUpgrades();
}

export function resetUpgrade() {
    upgradeCost = 4;
    isShopVisible = false;
    errorMessage = "";
    upgradeSelected = "";
    player.timeBought = 0;
    player.weightBought = 0;
}

export function canUpgrade() {
    if (upgradeSelected === "") return true;
    const money = getCurrentOrbsCount();

    if (money - upgradeCost >= 0) {
        return true;
    }
    else {
        errorMessage = "Insufficient Balance";

        setTimeout(() => {
            errorMessage = "";
        }, 2000);

        return false;
    }
}

export function updateUpgrade() {
    if (upgradeSelected !== "") upgradeCost += 2;

    if (upgradeSelected === "Time Surge") player.timeBought += 1;
    else if (upgradeSelected === "Strength Surge") player.weightBought += 1.5;
    else if (upgradeSelected === "Stun Break") {
        player.stunReduction = player.maxStunTime * 0.05;
        player.maxStunTime -= player.stunReduction;
    }
    else if (upgradeSelected === "Orb Magnet") {
        player.orbRadius += player.orbRadius * 0.08;
    }
    else if (upgradeSelected === "Bot Slower"){
        console.log("botSlower");
    }

    upgradeSelected = "";
}

export function pickRandomUpgrades() {
    const keys = [];
    let isAvailable = true;
    const upgradeKeys = Object.keys(upgradesAvailable);
    while (true) {
        const randomKey = upgradeKeys[randomInt(0, upgradeKeys.length - 1)];
        isAvailable = true;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key == randomKey) isAvailable = false;
        }
        if (isAvailable) {
            keys.push(randomKey);
        }
        if (keys.length === 2) {
            for (let j = 0; j < keys.length; j++) {
                displayUpgrades[j] = keys[j];
            }
            break;
        };
    }
}

export function selectedUpgrade(key) {
    if (key === "e") {
        upgradeSelected = displayUpgrades[0];
    }
    else if (key === 'f') {
        upgradeSelected = displayUpgrades[1];
    }
    else if (key === "esc") {
        upgradeSelected = "";
    }
}

export function renderShop() {
    const money = getCurrentOrbsCount();

    const color = money >= upgradeCost ? "#4CAF50" : "#F44336"

    const computerWidth = 240 * scale;
    const computerHeight = 192 * scale;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    let selected = upgradeSelected === displayUpgrades[0] ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for time
        selected, 0, 192, 64,
        computerX + 130, computerY + 100, 192 * 1, 64 * 1.8
    );

    ctx.fillStyle = "#00C853";
    ctx.font = "18px PixelFont";
    ctx.fillText(`${displayUpgrades[0]}`, computerX + 192 + 10, 65 + 64 + computerY);

    ctx.font = "12px PixelFont";
    ctx.textAlign = "left";
    wrapText(`${upgradesAvailable[displayUpgrades[0]]}`, computerX + 153, 100 + 64 + computerY, 192 - 20, 11);

    ctx.fillStyle = "#dde3ff";
    ctx.font = "18px PixelFont";
    ctx.fillText("Press 'E'", computerX + 182, 20 + 64 * 1.8 * 2 + computerY);

    drawOrbCost(computerX + 220, 60 + 64 * 1.8 * 2 + computerY, upgradeCost, color);

    selected = upgradeSelected === displayUpgrades[1] ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for weight carrage
        selected, 0, 192, 64,
        computerX + 192 + 200, computerY + 100, 192 * 1, 64 * 1.8
    );

    ctx.fillStyle = "#00C853";
    ctx.font = "18px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText(`${displayUpgrades[1]}`, computerX + 192 + 192 + 103, 65 + 64 + computerY);

    ctx.font = "12px PixelFont";
    ctx.textAlign = "left";
    wrapText(`${upgradesAvailable[displayUpgrades[1]]}`, computerX + 192 + 192 + 30, 100 + 64 + computerY, 192 - 20, 11);

    ctx.fillStyle = "#dde3ff";
    ctx.font = "18px PixelFont";
    ctx.fillText("Press 'F'", computerX + 192 + 192 + 60, 20 + 64 * 1.8 * 2 + computerY);

    drawOrbCost(computerX + 192 + 192 + 100, 60 + 64 * 1.8 * 2 + computerY, upgradeCost, color);

    if (errorMessage !== "") {
        ctx.fillStyle = "#F44336";
        ctx.font = "22px PixelFont";
        ctx.textAlign = "center";
        ctx.fillText(errorMessage, computerWidth / 2 + computerX, computerY + computerHeight - 220);
    }

    ctx.fillStyle = "#aab4ff";
    ctx.font = "14px PixelFont";
    ctx.textAlign = "center"
    ctx.fillText("Select An Upgrade And Press 'Space' To Continue", computerWidth / 2 + computerX, computerY + computerHeight - 120);

    ctx.fillStyle = "#6b728f";
    ctx.font = "12px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("Press 'ESC' To Deselect The Selected Upgrade", computerWidth / 2 + computerX, computerY + computerHeight - 100);
}

function drawOrbCost(centerX, y, cost, color) {
    const gap = 4;
    const orbSize = 16;
    const orbDiameter = orbSize * 2;

    ctx.font = "22px PixelFont";
    const textWidth = ctx.measureText(`${cost}`).width;

    const totalWidth = orbDiameter + gap + textWidth;
    const startX = centerX - totalWidth / 2;

    ctx.drawImage(
        orbSheet,
        0, 0, orbSize, orbSize,
        startX, y - orbSize, orbDiameter, orbDiameter
    );

    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`${cost}`, startX + orbDiameter + gap, y)
}
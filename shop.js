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
    else if (upgradeSelected === "Bot Slower") {
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
    const cx = computerX + computerWidth / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const cardW = Math.round(74 * scale);
    const cardH = Math.round(38 * scale);
    const cardY = computerY + Math.round(35 * scale);

    const card1X = computerX + Math.round(40 * scale);
    const card2X = computerX + computerWidth - cardW - Math.round(40 * scale);

    let selected = upgradeSelected === displayUpgrades[0] ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for time
        selected, 0, 192, 64,
        card1X, cardY, cardW, cardH
    );

    ctx.fillStyle = "#00C853";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    ctx.fillText(`${displayUpgrades[0]}`, card1X + Math.round(8 * scale), cardY + Math.round(11 * scale));

    ctx.font = `${Math.round(4 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    wrapText(
        `${upgradesAvailable[displayUpgrades[0]]}`,
        card1X + Math.round(8 * scale),
        cardY + Math.round(20 * scale),
        cardW - Math.round(6 * scale),
        Math.round(6 * scale)
    );

    ctx.fillStyle = "#dde3ff";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.fillText("Press 'E'", card1X + cardW / 2, cardY + cardH + Math.round(14 * scale));

    drawOrbCost(card1X + cardW / 2, cardY + cardH + Math.round(28 * scale), upgradeCost, color);

    selected = upgradeSelected === displayUpgrades[1] ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for weight carrage
        selected, 0, 192, 64,
        card2X, cardY, cardW, cardH
    );

    ctx.fillStyle = "#00C853";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    ctx.fillText(`${displayUpgrades[1]}`, card2X + Math.round(8 * scale), cardY + Math.round(11 * scale));

    ctx.font = `${Math.round(4 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    wrapText(
        `${upgradesAvailable[displayUpgrades[1]]}`,
        card2X + Math.round(8 * scale),
        cardY + Math.round(20 * scale),
        cardW - Math.round(6 * scale),
        Math.round(6 * scale)
    );

    ctx.fillStyle = "#dde3ff";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.fillText("Press 'F'", card2X + cardW / 2, cardY + cardH + Math.round(14 * scale));

    drawOrbCost(card2X + cardW / 2, cardY + cardH + Math.round(28 * scale), upgradeCost, color);

    if (errorMessage !== "") {
        ctx.fillStyle = "#F44336";
        ctx.font = `${Math.round(9 * scale)}px PixelFont`;
        ctx.textAlign = "center";
        ctx.fillText(errorMessage, cx, computerY + Math.round(125 * scale));
    }

    const bottomY = computerY + computerHeight - Math.round(50 * scale);

    ctx.fillStyle = "#aab4ff";
    ctx.font = `${Math.round(6 * scale)}px PixelFont`;
    ctx.textAlign = "center"
    ctx.fillText("Select An Upgrade And Press 'Space' To Continue", cx, bottomY);

    ctx.fillStyle = "#6b728f";
    ctx.font = `${Math.round(5 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.fillText("Press 'ESC' To Deselect The Selected Upgrade", cx, bottomY + Math.round(6 * scale) + Math.round(4 * scale));

    ctx.fillStyle = "#dde3ff";
    ctx.font = `${Math.round(5 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    const totalY = bottomY + Math.round(6 * scale) + Math.round(5 * scale) + Math.round(4 * scale) * 2;
    ctx.fillText(`Total Orbs Collected: ${getCurrentOrbsCount()}`, cx, totalY);

    ctx.drawImage(
        orbSheet,
        0, 0, 16, 16,
        cx + ctx.measureText(`Total Orbs Collected: ${getCurrentOrbsCount()}`).width / 2 + Math.round(2 * scale),
        totalY - Math.round(4.5 * scale), Math.round(6 * scale), Math.round(6 * scale)
    );
}

function drawOrbCost(centerX, y, cost, color) {

    const gap = Math.round(4 * scale);
    const orbSize = Math.round(16 * scale);

    ctx.font = `${Math.round(9 * scale)}px PixelFont`;
    const textWidth = ctx.measureText(`${cost}`).width;

    const totalWidth = orbSize + gap + textWidth;
    const startX = centerX - totalWidth / 2;

    ctx.drawImage(
        orbSheet,
        0, 0, 16, 16,
        startX, y - orbSize / 2, orbSize, orbSize
    );

    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`${cost}`, startX + orbSize + gap, y);
    ctx.textBaseline = "alphabetic";
}
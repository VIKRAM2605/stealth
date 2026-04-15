import { computerScreenSheet, computerSheet, ctx, height, orbSheet, width } from "./main.js";
import { getCurrentOrbsCount } from "./money.js";

export let isShopVisible = false;

export let upgradeCost = 8;

let upgradeSelected = "";

let errorMessage = "";

export function toggleShowShop() {
    isShopVisible = !isShopVisible;
    // console.log(isShopVisible);
}

export function canUpgrade() {
    if (upgradeSelected === "") return true;
    const money = getCurrentOrbsCount();

    if (money - upgradeCost >= 0) {
        return true;
    }
    else {
        errorMessage = "Insufficient Balance";

        setTimeout(()=>{
            errorMessage = "";
        },2000);

        return false;
    }
}

export function updateUpgrade() {
    if (upgradeSelected !== "") upgradeCost += 4;
}

export function selectedUpgrade(key) {
    if (key === "e") {
        upgradeSelected = "timesurge";
    }
    else if (key === 'f') {
        upgradeSelected = "strengthsurge";
    }
    else if (key === "esc") {
        upgradeSelected = "";
    }
    // console.log(upgradeSelected);
}

export function renderShop() {
    const money = getCurrentOrbsCount();

    const color = money >= upgradeCost ? "#4CAF50" : "#F44336"

    const computerWidth = 240 * 2;
    const computerHeight = 192 * 2;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    const timeSelected = upgradeSelected === "timesurge" ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for time
        timeSelected, 0, 192, 64,
        computerX + 80, computerY + 70, 192 * 0.7, 64
    );

    ctx.fillStyle = "#00C853";
    ctx.font = "12px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("Time Surge", computerX + 192 * 0.7 + 14, 40 + 64 + computerY);

    ctx.fillStyle = "#dde3ff";
    ctx.font = "14px PixelFont";
    ctx.textAlign = "center"
    ctx.fillText("Press 'E'", computerX + 192 * 0.7 + 14, 85 + 64 + computerY);

    // ctx.drawImage(
    //     orbSheet,
    //     0, 0, 16, 16,
    //     computerX + 192 * 0.7, 88 + 64 + computerY, 16, 16
    // );

    // ctx.fillStyle = color;
    // ctx.font = "14px PixelFont";
    // ctx.textAlign = "center";
    // ctx.fillText(`${upgradeCost}`, computerX + 192 * 0.7 + 14, 100 + 64 + computerY);

    drawOrbCost(computerX + 192 * 0.7 + 8, 95 + 64 + computerY, upgradeCost, color);

    const strengthSelected = upgradeSelected === "strengthsurge" ? 0 : 192;

    ctx.drawImage(
        computerScreenSheet,        //for weight carrage
        strengthSelected, 0, 192, 64,
        computerX + 192 + 70, computerY + 70, 192 * 0.7, 64
    );

    ctx.fillStyle = "#00C853";
    ctx.font = "12px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("Strength Surge", computerX + 192 + 192 * 0.7 + 4, 40 + 64 + computerY);

    ctx.fillStyle = "#dde3ff";
    ctx.font = "14px PixelFont";
    ctx.textAlign = "center"
    ctx.fillText("Press 'F'", computerX + 192 + 192 * 0.7 + 4, 85 + 64 + computerY);

    // ctx.drawImage(
    //     orbSheet,
    //     0, 0, 16, 16,
    //     computerX + 192 + 192 * 0.7 + 4, 88 + 64 + computerY, 16, 16
    // );

    // ctx.fillStyle = color;
    // ctx.font = "14px PixelFont";
    // ctx.textAlign = "center";
    // ctx.fillText(`${upgradeCost}`, computerX + 192 + 192 * 0.7 + 4, 100 + 64 + computerY);

    drawOrbCost(computerX + 192 + 192 * 0.7, 95 + 64 + computerY, upgradeCost, color);

    if (errorMessage !== "") {
        ctx.fillStyle = "#F44336";
        ctx.font = "14px PixelFont";
        ctx.textAlign = "center";
        ctx.fillText(errorMessage, computerWidth / 2 + computerX, computerY + computerHeight - 160);
    }

    ctx.fillStyle = "#aab4ff";
    ctx.font = "12px PixelFont";
    ctx.textAlign = "center"
    ctx.fillText("Select An Upgrade And Press 'Space' To Continue", computerWidth / 2 + computerX, computerY + computerHeight - 100);

    ctx.fillStyle = "#6b728f";
    ctx.font = "10px PixelFont";
    ctx.textAlign = "center";
    ctx.fillText("Press 'ESC' To Deselect The Selected Upgrade", computerWidth / 2 + computerX, computerY + computerHeight - 80);
}

function drawOrbCost(centerX, y, cost, color) {
    const gap = 4;
    const orbSize = 16;
    const orbX = centerX - orbSize - gap;

    ctx.drawImage(
        orbSheet,
        0, 0, orbSize, orbSize,
        orbX, y, orbSize, orbSize
    );

    ctx.fillStyle = color;
    ctx.font = "14px PixelFont";
    ctx.textAlign = "left";
    ctx.fillText(`${cost}`, centerX, y + 12)
}
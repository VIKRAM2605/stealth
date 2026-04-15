import { computerScreenSheet, computerSheet, ctx, height, width } from "./main.js";

export let isShopVisible = false;

export function toggleShowShop() {
    isShopVisible = !isShopVisible;
}

export function renderShop() {

    const computerWidth = 240 * 2;
    const computerHeight = 192 * 2;
    const computerX = (width / 2) - (computerWidth) / 2;
    const computerY = (height / 2) - (computerHeight) / 2;

    ctx.drawImage(
        computerSheet,
        0, 0, 240, 192,
        computerX, computerY, computerWidth, computerHeight
    );

    ctx.drawImage(
        computerScreenSheet,        //for time
        192, 64, 192, 64,
        0, 0, 192, 64
    );

    ctx.drawImage(
        computerScreenSheet,        //for weight carrage
        192, 64, 192, 64,
        100, 100, 192, 64
    )
}
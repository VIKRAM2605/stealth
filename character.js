import { collidesWithObject, collidesWithOrbs, collidesWithWall } from "./collision.js";
import { canvas, characterSpriteSheet, ctx, keys, scale } from "./main.js";
import { currentLevel, drawMap, getCurrentMap, setLevel } from "./map.js";
import { updateTotal } from "./money.js";
import { drawObject } from "./obstacle.js";
import { updateOrbs } from "./orbs.js";
import { renderDeathScreen } from "./retry.js";
import { isShopVisible, renderShop, toggleShowShop } from "./shop.js";
import { drawUi } from "./ui.js";

const characterSprite = {
    up: {
        frames: [
            {
                row: 2, col: 1
            },
            {
                row: 2, col: 2
            },
            {
                row: 2, col: 3
            },
            {
                row: 2, col: 4
            }
        ]
    },
    left: {
        frames: [
            {
                row: 3, col: 1
            },
            {
                row: 3, col: 2
            },
            {
                row: 3, col: 3
            },
            {
                row: 3, col: 4
            }
        ]
    },
    right: {
        frames: [
            {
                row: 4, col: 1
            },
            {
                row: 4, col: 2
            },
            {
                row: 4, col: 3
            },
            {
                row: 4, col: 4
            }
        ]
    },
    down: {
        frames: [
            {
                row: 1, col: 1
            },
            {
                row: 1, col: 2
            },
            {
                row: 1, col: 3
            },
            {
                row: 1, col: 4
            }
        ]
    },
};

export const deathSprite = {
    up: {
        frames: [
            {
                row: 5, col: 4
            },
            {
                row: 6, col: 1
            },
            {
                row: 6, col: 2
            }
        ]
    },
    left: {
        frames: [
            {
                row: 6, col: 3
            },
            {
                row: 6, col: 4
            },
            {
                row: 7, col: 1
            }
        ]
    },
    right: {
        frames: [
            {
                row: 7, col: 2
            },
            {
                row: 7, col: 3
            },
            {
                row: 7, col: 4
            }
        ]
    },
    down: {
        frames: [
            {
                row: 5, col: 1
            },
            {
                row: 5, col: 2
            },
            {
                row: 5, col: 3
            }
        ]
    }
};

export let isDead = false;
let lastTime = 0;
export let player = {
    x: 32,
    y: 32,
    currentFrame: "down",
    frameIndex: 0,
    frameTimer: 0,
    speed: 100,
    weight: 0,
    timeLeft: 20,
    timeBought: 0,
    weightBought: 0
}

export function toggleDeath() {
    isDead = !isDead;
}

export function initPlayer(){
    player.timeLeft += player.timeBought;
}

//update character only takes horizontal first.
function updateCharacter(delta) {

    const map = getCurrentMap();
    const tileSize = 16 * scale;

    player.timeLeft -= delta; //countdown;

    if (player.timeLeft <= 0) {
        toggleDeath();
        return;
    }

    let dx = 0, dy = 0;
    if (keys.left) {
        dx = -1;
        player.currentFrame = "left";
    }
    if (keys.right) {
        dx = 1;
        player.currentFrame = "right";
    }
    if (keys.up) {
        dy = -1;
        player.currentFrame = "up";
    }
    if (keys.down) {
        dy = 1;
        player.currentFrame = "down";
    }

    if (dx && dy) {
        dx /= Math.SQRT2;
        dy /= Math.SQRT2;
    }

    const currentSpeed = Math.max(30,player.speed - (player.weight - player.weightBought * 5));

    player.x += dx * delta * currentSpeed;
    if (collidesWithWall(map, player.x, player.y, tileSize - 1, tileSize - 1) || collidesWithObject(player.x, player.y, 16 * scale - 1, 16 * scale - 1)) {
        player.x -= dx * delta * currentSpeed;
    }

    player.y += dy * delta * currentSpeed;
    if (collidesWithWall(map, player.x, player.y, tileSize - 1, tileSize - 1) || collidesWithObject(player.x, player.y, 16 * scale - 1, 16 * scale - 1)) {
        player.y -= dy * delta * currentSpeed;
    }

    const playerRow = Math.floor(player.y / tileSize);
    const playerCol = Math.floor(player.x / tileSize);

    const tile = map[playerRow]?.[playerCol] ?? 0;

    // if (tile !== 10 && tile !== 18) {
    //     player.x -= dx * delta * player.speed;
    //     player.y -= dy * delta * player.speed;
    // }

    if (playerRow >= map.length - 2 && (tile === 10 || tile === 18)) {
        // setLevel(currentLevel + 1);
        // player.x = 32;
        // player.y = 32;
        toggleShowShop();
    }

    if (collidesWithOrbs(player.x, player.y, 16 * scale - 1, 16 * scale - 1)) {
        console.log("orb collected");
        updateTotal();
    }

    if (dx !== 0 || dy !== 0) {
        player.frameTimer += delta;
        if (player.frameTimer >= 0.15) {
            player.frameTimer = 0;
            const frames = isDead ? deathSprite[player.currentFrame].frames : characterSprite[player.currentFrame].frames;
            player.frameIndex = (player.frameIndex + 1) % frames.length;
        }
    } else {
        player.frameIndex = 0;
    }

}

function drawCharacter() {

    let frames;
    if (isDead) {
        frames = deathSprite[player.currentFrame].frames;
    } else {
        frames = characterSprite[player.currentFrame].frames;
    }

    let frame = frames[player.frameIndex];

    // console.log(frame);

    ctx.drawImage(
        characterSpriteSheet,
        (frame.col - 1) * 16, (frame.row - 1) * 16, 16, 16,
        player.x, player.y, 16 * scale, 16 * scale
    );
};

export function gameLoop(currentTime) {
    let delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    if (delta > 0.1) delta = 0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isDead) {
        renderDeathScreen(delta);
        requestAnimationFrame(gameLoop);
        return;
    }

    if (isShopVisible) {
        renderShop();
        requestAnimationFrame(gameLoop);
        return;
    }

    drawMap();
    drawObject();
    drawUi();

    updateCharacter(delta);
    updateOrbs(delta);

    drawCharacter();

    requestAnimationFrame(gameLoop)
}

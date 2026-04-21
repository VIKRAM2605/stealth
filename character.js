import { collidesWithObject, collidesWithOrbs, collidesWithWall, collisionWithButton, collisionWithLaser, collisionWithPortal } from "./collision.js";
import { updateLaser } from "./lasers.js";
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
    x: 52,
    y: 32,
    currentFrame: "down",
    frameIndex: 0,
    frameTimer: 0,
    speed: 150,
    weight: 0,
    timeLeft: 20,
    timeBought: 0,
    weightBought: 0,
    stunTime: 0,
    maxStunTime: 2,
    stunReduction: 0,
    isStun: false,
}

export function toggleDeath() {
    isDead = !isDead;
}

export function initPlayer() {
    player.timeLeft += player.timeBought;
}

export function resetPlayer() {
    player.frameTimer = 0;
    player.frameIndex = 0;
    player.currentFrame = "down";
    player.isStun = false;
    player.stunTime = 0;
    player.maxStunTime = 2;
    player.x = 52;
    player.y = 32;
    player.timeLeft = 20;
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

    if (player.isStun) {
        player.stunTime += delta;

        if (player.stunTime > player.maxStunTime) {
            player.stunTime = 0;
            player.frameTimer = 0;
            player.frameIndex = 0;
            player.isStun = false;
            return;
        }

        player.frameTimer += delta;
        if (player.frameTimer >= 0.15) {
            player.frameTimer = 0;
            const frames = deathSprite[player.currentFrame].frames;
            player.frameIndex = (player.frameIndex + 1) % (frames.length);
        }

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

    const currentSpeed = Math.max(30, player.speed - Math.max(0, (player.weight - player.weightBought * 12.5 / 2)));

    if (collisionWithLaser(player.x, player.y, tileSize - 1, tileSize - 1)) {
        player.isStun = true;
        // const knockBack = scale * 8;
        // if (player.currentFrame === "left") player.x += knockBack;
        // if (player.currentFrame === "right") player.x -= knockBack;
        // if (player.currentFrame === "up") player.y += knockBack;
        // if (player.currentFrame === "down") player.y -= knockBack;

        player.x -= dx * scale * 8;
        if (collisionWithLaser(player.x, player.y, tileSize - 1, tileSize - 1)) {
            player.x += dx * scale * 8;
        }

        player.y -= dy * scale * 8;
        if (collisionWithLaser(player.x, player.y, tileSize - 1, tileSize - 1)) {
            player.y += dy * scale * 8;
        }

        player.frameTimer = 0;
        player.frameIndex = 0;

        return;
    }

    if (collisionWithButton(player.x, player.y, tileSize - 1, tileSize - 1, delta)) {
        console.log("collided with button");
    }

    const portalCollision = collisionWithPortal(player.x, player.y, 16 * scale - 1, 16 * scale - 1, delta);
    if (portalCollision) {
        console.log(portalCollision);

        const offsetY = tileSize * 0.3;

        player.x = portalCollision.col * tileSize;
        player.y = portalCollision.row * tileSize - offsetY;
        return;
    }

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

    if (playerRow >= map.length - 2 && (tile === 10 || tile === 18)) {
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
    if (isDead || player.isStun) {
        frames = deathSprite[player.currentFrame].frames;
    } else {
        frames = characterSprite[player.currentFrame].frames;
    }

    let frame = frames[player.frameIndex % frames.length];

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
    updateLaser(delta);

    drawCharacter();

    requestAnimationFrame(gameLoop)
}

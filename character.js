import { canvas, characterSpriteSheet, ctx, keys, scale } from "./main.js";
import { drawMap } from "./map.js";

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

const deathSprite = {
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

let isDead = false;
let lastTime = 0;
let player = {
    x: 0,
    y: 0,
    currentFrame: "down",
    frameIndex: 0,
    frameTimer: 0,
    speed: 50,
}

//update character only takes horizontal first.
function updateCharacter(delta) {
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

    if(dx && dy){
        
    }

    player.x += dx * delta * player.speed;
    player.y += dy * delta * player.speed;

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

    let frame = frames[player.frameIndex]

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

    
    drawMap();
    updateCharacter(delta);

    drawCharacter();

    requestAnimationFrame(gameLoop)
}
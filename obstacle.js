import { crateSheet, ctx, scale } from "./main.js";
import { currentLevel } from "./map.js";

const tileSize = 16;

export const crateSprites = {
    0: [
        {
            row: 1, col: 1
        },
        {
            row: 1, col: 2
        }
    ],
    1: [
        {
            row: 1, col: 3
        }
    ],
    2: [
        {
            row: 2, col: 1,
        },
        {
            row: 2, col: 2
        }
    ],
    3: [
        {
            row: 2, col: 3
        }
    ],
    4: [
        {
            row: 3, col: 1,
        },
        {
            row: 3, col: 2
        }
    ],
    5: [
        {
            row: 3, col: 3
        }
    ],
    6: [
        {
            row: 4, col: 1
        },
        {
            row: 4, col: 2
        }
    ],
    7: [
        {
            row: 5, col: 1
        },
        {
            row: 5, col: 2
        }
    ]
};

export const crateMap = {
    1: [
        {
            row: 2, col: 2, crate: 0
        },
        {
            row: 4, col: 4, crate: 1
        },
        {
            row: 6, col: 6, crate: 2
        },
        {
            row: 8, col: 8, crate: 3
        },
        {
            row: 10, col: 10, crate: 4
        },
        {
            row: 2, col: 6, crate: 5
        },
        {
            row: 4, col: 8, crate: 6
        },
        {
            row: 6, col: 10, crate: 7
        }
    ],
    2: [
        {
            row: 2, col: 2, crate: 0
        },
        {
            row: 4, col: 7, crate: 5
        },
        {
            row: 4, col: 8, crate: 6
        },
        {
            row: 10, col: 10, crate: 7
        },
        {
            row: 13, col: 10, crate: 7
        },
        {
            row: 13, col: 3, crate: 0
        },
        {
            row: 6, col: 11, crate: 4
        },
        {
            row: 3, col: 10, crate: 5
        },
        {
            row: 6, col: 4, crate: 7
        }
    ]

};

// i have mistankenly swapped the drawing to col and row in the function so it is what it is now

export function drawObject() {
    const crates = crateMap[currentLevel] ?? [];

    for (let i = 0; i < crates.length; i++) {
        const crate = crates[i];
        const sprite = crateSprites[crate.crate];
        let drawX = crate.row * tileSize * scale;
        let drawY = crate.col * tileSize * scale;
        for (let j = 0; j < sprite.length; j++) {
            ctx.drawImage(
                crateSheet,
                (sprite[j].col - 1) * tileSize, (sprite[j].row - 1) * tileSize, tileSize, tileSize,
                drawX, drawY, tileSize * scale, tileSize * scale
            );
            drawX += tileSize * scale;
        }
    }
};


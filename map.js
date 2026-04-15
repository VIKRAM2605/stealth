import { ctx, scale, tileset } from "./main.js";

const tileSize = 16;

const tiles = {
    0: { row: 1, col: 1 }, //wall horizontal right end
    1: { row: 1, col: 2 }, //wall vertical right connect
    2: { row: 1, col: 3 }, //wall vertical no connect
    3: { row: 1, col: 4 }, //wall horizontal flat end connects
    4: { row: 2, col: 1 }, //wall vertical top connect right connect botton-left edge
    5: { row: 2, col: 2 }, //wall vertical top connect left connect botton-right edge
    6: { row: 2, col: 3 }, //wall vertical straight bottom connect top blocked
    7: { row: 2, col: 4 }, //wall vertical top-left-right connect bottom blocked
    8: { row: 3, col: 1 }, //wall vertical bottom-left-right connect top blocked
    9: { row: 3, col: 2 }, //wall vertical top-bottom connect mid right-connect
    10: { row: 3, col: 3 }, //floor
    11: { row: 3, col: 4 }, //wall horizontal right connect left blocked
    12: { row: 4, col: 1 }, //wall vertical bottom connect left top-edge connect top blocked
    13: { row: 4, col: 2 }, //wall vertical top connect bottom blocked
    14: { row: 4, col: 3 },//wall horizontal right connect left blocked
    15: { row: 4, col: 4 }, //wall vertical top-bottom connect right blocked left-mid connect
    16: { row: 5, col: 1 }, //wall broken left start
    17: { row: 5, col: 2 }, //wall broken right start
    18: { row: 5, col: 3 } //transparent cell no wall no nothing
};

const maps = {
    1: [
        //0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12], //row 0
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 1
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 2
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 3
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 4
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 5
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 6
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 7
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 8
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 9
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 10
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 11
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 12
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 13
        [4, 3, 3, 3, 3, 3, 0, 10, 10, 11, 3, 3, 3, 3, 3, 5], //row 15
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18], //row 15

    ],
    2: [
        //0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12], //row 0
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 1
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 1
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 1
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 3, 3, 3, 3, 5], //row 2
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 3
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 3
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 3
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 3
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 4, 3, 3, 3, 3, 12], //row 7
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 8
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 9
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 3, 3, 3, 5], //row 10
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 11
        [2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2], //row 12
        [2, 13, 14, 15, 16, 17, 18, 2, 3, 4, 5, 2], //row 13
        [4, 14, 3, 3, 3, 3, 0, 10, 10, 11, 3, 3, 3, 3, 3, 5], //row 15
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18], //row 15

    ],
};

export let currentLevel = 1;

export function setLevel(n) {
    // currentLevel = n;
    console.log("Next Level", n);
};

export function getCurrentMap() {
    return maps[currentLevel];
};

export function drawMap() {
    const map = getCurrentMap();
    const size = tileSize * scale;

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const tileId = map[row][col];
            const tile = tiles[tileId];

            if (!tile) tile = { row: 3, col: 3 };

            ctx.drawImage(
                tileset,
                (tile.col - 1) * tileSize, (tile.row - 1) * tileSize, tileSize - 1, tileSize - 1,
                col * size, row * size, size, size
            )
        }
    }
};
import { ctx, orbParticlesSheet, orbSheet, scale } from "./main.js";
import { currentLevel } from "./map.js";

const tileSize = 16;

const orbsSprite = {
    0: { row: 1, col: 1 },
    1: { row: 1, col: 2 },
    2: { row: 1, col: 3 },
    3: { row: 1, col: 4 },
    4: { row: 1, col: 5 },
    5: { row: 1, col: 6 },
    6: { row: 1, col: 7 },
    7: { row: 1, col: 8 },
    8: { row: 1, col: 9 },
    9: { row: 1, col: 10 }
};

const obrParticleSprite = [
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
    { row: 1, col: 6 },
    { row: 1, col: 7 },
    { row: 1, col: 8 }
];

const sides = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 1 },
];

const frameTimer = 0.20;
export const orbsList = {
    1: [
        {
            id: "orb1_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 5,
            col: 10,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb2_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 5,
            col: 5,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb3_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 10,
            col: 12,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb4_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 1,
            col: 14,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb4_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 13,
            col: 1,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb5_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 9,
            col: 3,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb6_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 8,
            col: 13,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb7_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 3,
            col: 7,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb8_lvl1",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 13,
            col: 8,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        }
    ],
    2: [
        {
            id: "orb1_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 3,
            col: 2,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb2_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 10,
            col: 12,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb3_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 8,
            col: 6,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb4_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 1,
            col: 14,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb5_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 3,
            col: 11,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb6_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 13,
            col: 1,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb7_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 6,
            col: 7,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb8_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 4,
            col: 4,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb9_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 11,
            col: 14,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        },
        {
            id: "orb10_lvl2",
            orbIndex: 0,
            orbTime: 0,
            collected: false,
            row: 12,
            col: 8,
            particle: null,
            particleTime: 0,
            particleOffset: 0
        }
    ]
};

export function resetMapOrbs() {
    for (let i = 0; i < (orbsList[currentLevel]??[]).length; i++) {
        orbsList[currentLevel][i].collected = false;
        orbsList[currentLevel][i].orbIndex = 0;
        orbsList[currentLevel][i].orbTime = 0;
        orbsList[currentLevel][i].particle = null;
        orbsList[currentLevel][i].particleTime = 0;
    }
}

let particleSelectionCooldown = 0;
const maxParticleSelectionCoolDown = 1;

export function updateOrbs(delta) {
    updateParticleTimer(delta);
    const chance = randomInt(0, 100);
    if (particleSelectionCooldown >= 0) {
        particleSelectionCooldown -= delta;
    }
    else if (chance > 65) {
        pickParticleForOrbs();
        particleSelectionCooldown = maxParticleSelectionCoolDown;
    }
    for (let i = 0; i < (orbsList[currentLevel] ?? []).length; i++) {

        if (orbsList[currentLevel][i].collected) continue;

        orbsList[currentLevel][i].orbTime += delta;
        if (orbsList[currentLevel][i].orbTime >= frameTimer) {
            orbsList[currentLevel][i].orbIndex++;
            if (orbsList[currentLevel][i].orbIndex >= Object.keys(orbsSprite).length) orbsList[currentLevel][i].orbIndex = 0;
            orbsList[currentLevel][i].orbTime = 0;
        }

        drawOrb(orbsList[currentLevel][i].row, orbsList[currentLevel][i].col, orbsList[currentLevel][i].orbIndex);
    }
    drawOrbParticles();
};


export function drawOrb(row, col, index) {
    const pos = orbsSprite[index] ?? [];
    const orbSize = tileSize * (scale - 1);
    const offset = (tileSize * scale - orbSize) / 2;
    ctx.drawImage(
        orbSheet,
        (pos.col - 1) * tileSize, (pos.row - 1) * tileSize, tileSize, tileSize,
        col * tileSize * scale + offset, row * tileSize * scale + offset, orbSize, orbSize
    );
};



export function drawOrbParticles() {
    const particleSize = tileSize * (scale - 1);
    const offset = (tileSize * scale - particleSize) / 2;

    for (let i = 0; i < (orbsList[currentLevel] ?? []).length; i++) {
        const orb = orbsList[currentLevel][i];

        if (orb.particle === null) continue;

        const particleFrame = obrParticleSprite[orb.particle];
        const particleOffset = orb.particleOffset ?? { dx: 0, dy: 0 };

        ctx.drawImage(
            orbParticlesSheet,
            (particleFrame.col - 1) * tileSize, (particleFrame.row - 1) * tileSize, tileSize, tileSize,
            orb.col * tileSize * scale + offset + particleOffset.dx * tileSize * scale * 0.4,
            orb.row * tileSize * scale + offset + particleOffset.dy * tileSize * scale * 0.4,
            particleSize, particleSize
        );
    }
}

export function pickParticleForOrbs() {
    let attempt = 0;
    const maxAttempt = 10;

    while (attempt < maxAttempt) {
        const randomIndex = randomInt(0, (orbsList[currentLevel] ?? []).length - 1);
        if (orbsList[currentLevel][randomIndex].particle === null) {
            const randomParticleIndex = randomInt(0, obrParticleSprite.length - 1);
            const side = sides[randomInt(0, sides.length - 1)];

            orbsList[currentLevel][randomIndex].particle = randomParticleIndex;
            orbsList[currentLevel][randomIndex].particleOffset = side;
            break;
        }
        attempt++;
    }
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function updateParticleTimer(delta) {
    for (let i = 0; i < (orbsList[currentLevel] ?? []).length; i++) {
        if (orbsList[currentLevel][i].particle === null) continue;

        orbsList[currentLevel][i].particleTime += delta;
        if (orbsList[currentLevel][i].particleTime >= 1.7) {
            orbsList[currentLevel][i].particle = null;
            orbsList[currentLevel][i].particleTime = 0;
        }
    }
}
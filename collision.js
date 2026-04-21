import { player } from "./character.js";
import { laserLevelMap } from "./lasers.js";
import { scale } from "./main.js";
import { currentLevel } from "./map.js";
import { crateMap, crateSprites } from "./obstacle.js";
import { orbsList } from "./orbs.js";
import { animatePortal, portalLevelMap, resetAnimationTimer } from "./portal.js";

// const tile = 16;

export function getTile(map, px, py) {
    const tileSize = 16 * scale;
    const row = Math.floor(py / tileSize);
    const col = Math.floor(px / tileSize);
    const tile = map[row]?.[col] ?? 0;

    return tile;
}

export function collidesWithWall(map, x, y, w, h) {
    const tileSize = 16 * scale;
    const topOffset = 8 * scale;

    const topLeftTile = getTile(map, x, y + topOffset);
    const topRightTile = getTile(map, x + w, y + topOffset);
    const bottomLeftTile = getTile(map, x, y + h);
    const bottomRightTile = getTile(map, x + w, y + h);

    const walkable = (t) => t === 10 || t === 18;

    return !walkable(topLeftTile) ||
        !walkable(topRightTile) ||
        !walkable(bottomLeftTile) ||
        !walkable(bottomRightTile);

};

export function collidesWithObject(px, py, pw, ph) {
    const tileSize = 16 * scale;
    const crates = crateMap[currentLevel];
    const topOffset = 8 * scale;
    const leftRightOffset = 3 * scale;

    for (let i = 0; i < crates.length; i++) {
        const crate = crates[i];

        const spriteArray = crateSprites[crate.crate];
        const n = spriteArray.length;

        const cx = crate.row * tileSize
        const cy = crate.col * tileSize;
        const cw = tileSize * n;
        const ch = tileSize;

        const overLapX = px + leftRightOffset < cx + cw && px + pw > cx + leftRightOffset;
        const overLapY = py + topOffset < cy + ch && py + ph > cy;

        if (overLapX && overLapY) return true;
    }

    return false;

}

export function collidesWithOrbs(px, py, pw, ph) {
    const orbs = orbsList[currentLevel];
    const tileSize = 16 * scale;
    const orbSize = 16 * (scale - 1);
    const offset = (tileSize - orbSize) / 2 * 1.5;

    for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        if (orb.collected) continue;

        const ox = orb.col * tileSize + offset;
        const oy = orb.row * tileSize + offset;
        // const ow = 16;
        // const oh = 16;

        const overLapX = px < ox + orbSize && px + pw > ox;
        const overLapY = py < oy + orbSize && py + ph > oy;

        if (overLapX && overLapY) {
            orbsList[currentLevel][i].collected = true;
            player.weight += 12.5;
            return true;
        }

        //console.log(orb, ox, oy, ow, oh)
    }
    return false
}

let portalCollideTime = 0;
const portalMaxCollideTime = 2;
let portalCoolDown = 0;
const portalMaxCoolDown = 1;

export function collisionWithPortal(px, py, pw, ph, delta) {
    const portals = portalLevelMap[currentLevel];
    const tileSize = 16 * scale;

    if (portalCoolDown > 0) {
        portalCoolDown -= delta;
        resetAnimationTimer();
        return null;
    }

    for (let i = 0; i < portals.length; i++) {
        const portal = portals[i];
        // console.log(portal)

        const pox = portal.col * tileSize;
        const poy = portal.row * tileSize;

        const overlapX = px < pox + tileSize && px + pw > pox;
        const overlapY = py < poy + tileSize && py + ph > poy;

        if (overlapX && overlapY) {
            portalCollideTime += delta;
            animatePortal(delta, i);
            // console.log(portal);
            if (portalCollideTime >= portalMaxCollideTime) {
                portalCollideTime = 0;
                portalCoolDown = portalMaxCoolDown;
                const toPortalId = portal.to;
                let toPortal = null;
                for (let j = 0; j < portals.length; j++) {
                    if (toPortalId === portals[j].id) {
                        toPortal = portals[j];
                    }
                }

                if (!toPortal) return null;

                return toPortal;
            }
            return null;
        }
    }
    resetAnimationTimer();
    for (let j = 0; j < portals.length; j++) {
        portalLevelMap[currentLevel][j].animIndex = 0;
    }
    portalCollideTime = 0;
    return null;
}

export function collisionWithLaser(px, py, pw, ph) {
    const lasers = laserLevelMap[currentLevel];
    const tileSize = 16 * scale;
    
    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];

        const lx = laser.col * tileSize;
        const ly = laser.row * tileSize;

        const overlapX = px < lx + tileSize && px + pw > lx;
        const overlapY = py < ly + tileSize && py + ph > ly;

        if(overlapX && overlapY){
            return true;
        }
    }
    return false;
}
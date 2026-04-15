let orbsCollected = 0;

export function updateTotal() {
    orbsCollected += 1;
}

export function getCurrentOrbsCount() {
    return orbsCollected;
}

export function deductOrbs(n) {
    if (orbsCollected - n < 0) return false
    orbsCollected -= n;
    return true;
}
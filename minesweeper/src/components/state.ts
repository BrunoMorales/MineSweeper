import { Game, Mine } from "./domain";
import { traverseNeighbours } from "./newgame";

function update(game: Game, f: ((mine: Mine) => Mine), exploded = false): Game {
    const updated = game.state.slice().map(row => {
        return row.slice().map(field => {
            return f(field);
        });
    });
    return new Game(updated, game.totalBombs, game.exploded || exploded);
}

export function markMine(game: Game, opened: Mine): Game {
    if (opened.isOpened && !opened.isFlagged) return exploreOpenedField(game, opened);
    return update(game, (field: Mine) => {
        if (field == opened) {
            return new Mine(field.position, false, field.bombs, !field.isFlagged);
        } else {
            return new Mine(field.position, field.isOpened, field.bombs, field.isFlagged);
        }
    });
}

function exploreOpenedField(game: Game, opened: Mine): Game {
    const updated = update(game, (field: Mine) => field);
    let hitMine = false;
    traverseNeighbours(updated.state, opened, field => {
        if (!field.isOpened && !field.isFlagged) {
            if (isMine(field)) {
                hitMine = true;
            } else {
                field.isOpened = true;
                if (field.bombs == 0) {
                    updateZeros(updated.state, field);
                }
            }
        }
        return field;
    });
    if (hitMine) {
        return endGame(game);
    }
    return updated;
}

function updateZeros(fields: Array<Array<Mine>>, start: Mine) {
    traverseNeighbours(fields, start, (field => {
        if (!field.isOpened && !isMine(field)) {
            field.isOpened = true;
            if (field.bombs == 0) {
                updateZeros(fields, field);
            }
        }
        return field;
    }));
}

export function checkCompleted(game: Game): boolean {
    const and = (a: boolean, b: boolean) => a && b;
    return game.state.map(row => {
        return row.map(field => {
            return isMineCovered(field);
        }).reduce(and);
    }).reduce(and);
}
function isMineCovered(field: Mine) {
    if (isMine(field)) {
        return field.isFlagged;
    } else {
        return field.isOpened;
    }
}

export function countFlagged(game: Game): number {
    const plus = (a: number, b: number) => a + b;
    return game.state.map(row => {
        return row.map(field => {
            return field.isFlagged ? 1 : 0;
        }).reduce(plus, 0);
    }).reduce(plus, 0);
}

function endGame(game: Game): Game {
    return update(game, (field) => {
        if (isMine(field)) {
            return new Mine(field.position, true, field.bombs, field.isFlagged);
        } else {
            return new Mine(field.position, field.isOpened, field.bombs, field.isFlagged);
        }
    }, true);
}

export function openMine(game: Game, field: Mine): Game {
    if (field.isFlagged) return game;
    else if (isMine(field)) {
        return endGame(game);
    } else {
        const openField = (openedField: Mine) => (field: Mine) => {
            if (field === openedField) {
                return new Mine(field.position, true, field.bombs, false);
            } else {
                return new Mine(field.position, field.isOpened, field.bombs, field.isFlagged);
            }
        };
        let result = update(game, openField(field));
        if (field.bombs == 0) {
            updateZeros(result.state, field);
        }
        return result;
    }
}
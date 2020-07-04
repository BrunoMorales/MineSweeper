import React from 'react'

const getSurroundingFields = (mineId: string): string[] => {
    const row: number = Number(mineId.substr(0, mineId.length / 2))
    const col: number = Number(mineId.substr(mineId.length / 2, mineId.length))
    let surroundingFields = []
    for (let rowMod = -1; rowMod <= 1; rowMod++) {
        for (let colMod = -1; colMod <= 1; colMod++) {
            surroundingFields.push(`${row - rowMod}${col - colMod}`)
        }
    }
    return surroundingFields
}
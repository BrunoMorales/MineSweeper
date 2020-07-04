import React, { FC, ReactElement, Mixin } from 'react';
import MineField from './MineField';
import mineState from './mineState';


// const getSurroundingFields = (mineId: string): string[] => {
//     const row: number = Number(mineId.substr(0, mineId.length / 2))
//     const col: number = Number(mineId.substr(mineId.length / 2, mineId.length))
//     let surroundingFields = []
//     for (let rowMod = -1; rowMod <= 1; rowMod++) {
//         for (let colMod = -1; colMod <= 1; colMod++) {
//             surroundingFields.push(`${row - rowMod}${col - colMod}`)
//         }
//     }
//     return surroundingFields
// }

interface mineSweeperProps {
    difficulty: number
}

const MineSweeper: FC<mineSweeperProps> = ({ difficulty }): ReactElement => {

    const gameState = new mineState(difficulty)

    // const revealMines = (mineId: string): number => {
    //     let mineCount = 0
    //     const surroundingFields = getSurroundingFields(mineId)
    //     surroundingFields.map((fieldId) => {
    //         gameState.mineList?.includes(fieldId) && mineCount++
    //     })
    //     if (mineCount === 0) {
    //         surroundingFields.map(field => {

    //         })
    //     }
    //     return mineCount
    // }

    const clickField = (clickedMineId: string) => {
        console.log('i have been clicked, i am ', clickedMineId)
        // if (gameState.mineList.length === 0) {
        //     const mineList: string[] = setMines(totalCols, totalRows, totalMines, clickedMineId)
        //     setGameState({ ...gameState, mineList })
        // }
        // gameState.clickedFields.push(clickedMineId)

        // if (gameState.mineList.includes(clickedMineId)) {
        //     return 'B'
        // } else {
        //     return revealMines(clickedMineId)
        // }

    }
    const totalRows = 10
    const totalCols = 15

    return (
        <section>
            {
                [...Array(totalRows)].map((row, colIndex) =>
                    <div key={colIndex}>
                        {
                            [...Array(totalCols)].map((column, mineIndex) => {
                                const mineId = `${colIndex}${mineIndex}`
                                return <MineField id={mineId} key={`${colIndex}${mineIndex}`} />
                            }
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}



export default MineSweeper;

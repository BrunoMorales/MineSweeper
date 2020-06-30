import React, { useState, FC, ReactElement, useEffect } from 'react';

interface gameConfig {
    title: string
    totalMines: number
    totalRows: number
    totalCols: number
}
const EASY: gameConfig = {
    title: 'Fácil',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}
const MEDIUM: gameConfig = {
    title: 'Mediana',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}
const HARD: gameConfig = {
    title: 'Difícil',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}
const MineSweeper: FC = (): ReactElement => {
    const [difficulty, setDifficulty] = useState<gameConfig>(EASY)

    return (
        <main className="">
            <header className="text-center w-full">
                <h1>
                    Buscaminas
        </h1>
                <p>Por <b>Bruno Morales</b></p>
                <label>
                    <p>
                        Dificultad:
          </p>
                    <div>
                        <button onClick={() => { setDifficulty(EASY) }}>Fácil</button>
                        <button onClick={() => { setDifficulty(MEDIUM) }}>Media</button>
                        <button onClick={() => { setDifficulty(HARD) }}>Difícil</button>
                    </div>
                </label>
                <Game config={difficulty} />
            </header>
        </main>
    );
}
interface gameProps {
    config: gameConfig
}
interface gameStateProps {
    mineList: string[]
    clickedFields: string[]
    config: gameConfig
}
interface mineProps {
    id: string
    onClick: Function
}

const Game: FC<gameProps> = (
    { config }
): ReactElement => {
    const [gameState, setGameState] = useState<gameStateProps>({ mineList: [], clickedFields: [], config })
    const { totalCols, totalRows, totalMines } = config

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

    const revealMines = (mineId: string): number => {
        let mineCount = 0
        const surroundingFields = getSurroundingFields(mineId)
        surroundingFields.map((fieldId) => {
            gameState.mineList?.includes(fieldId) && mineCount++
        })
        if (mineCount === 0) {
            surroundingFields.map(field => {

            })
        }
        return mineCount
    }

    const clickField = (clickedMineId: string) => {
        console.log(gameState)
        if (gameState.mineList.length === 0) {
            const mineList: string[] = setMines(totalCols, totalRows, totalMines, clickedMineId)
            setGameState({ ...gameState, mineList })
        }
        gameState.clickedFields.push(clickedMineId)

        if (gameState.mineList.includes(clickedMineId)) {
            return 'B'
        } else {
            return revealMines(clickedMineId)
        }

    }

    return (
        <section>
            {
                [...Array(totalRows)].map((row, colIndex) =>
                    <div key={colIndex}>
                        {
                            [...Array(totalCols)].map((column, mineIndex) => {
                                const mineId = `${colIndex}${mineIndex}`
                                return <Mine onClick={clickField} id={mineId} key={`${colIndex}${mineIndex}`} />
                            }
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}



const Mine: FC<mineProps> = ({ id, state }): ReactElement => {
    const [mineState, setMineState] = useState('H')

    return (
        <button onClick={clickHandler} >
            {mineState}
        </button>
    )
}




const setMines = (cols: number, rows: number, totalMines: number, startingPoint: string): string[] => {
    let mineField: string[] = []
    while (mineField.length < totalMines) {
        const mineId: string = `${Math.round(Math.random() * (rows - 1))}${Math.round(Math.random() * (cols - 1))}`
        mineId !== startingPoint && mineField.push(
            mineId
        )
        mineField = mineField.filter((id, index) => index === mineField.indexOf(id))
    }
    return mineField
}




export default MineSweeper;

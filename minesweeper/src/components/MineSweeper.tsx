import React, { FC, ReactElement, Mixin, useState } from 'react';
import MineField from './MineField';
import { getState, clickField } from './mineState';



interface mineSweeperProps {
    difficulty: number
}

const MineSweeper: FC<mineSweeperProps> = ({ difficulty }): ReactElement => {
    const gameState = getState()


    const clickHandler = (fieldId: string) => {
        clickField(fieldId)
    }

    return (
        <section className='px-4 my-6 w-full'>
            {
                [...Array(gameState.layout.totalRows)].map((row, colIndex) =>
                    <div className='flex flex-row md:w-1/2 mx-auto' key={colIndex}>
                        {
                            [...Array(gameState.layout.totalCols)].map((column, mineIndex) => {
                                const mineId = `${colIndex}${mineIndex}`
                                return <MineField id={mineId} clickHandler={clickHandler} key={`${colIndex}${mineIndex}`} />
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

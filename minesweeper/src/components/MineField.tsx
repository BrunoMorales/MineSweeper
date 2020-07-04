import React, { useState, FC, ReactElement, useEffect } from "react"
import { clickField } from "./mineState"
interface mineFieldProps {
    id: string
    clickHandler: (fieldId: string) => void
}


const MineField: FC<mineFieldProps> = ({ id }): ReactElement => {
    const [mineState, setMineState] = useState('H')

    const clickHandler = () => {
        setMineState(clickField(id))
    }

    return (
        <button
            onClick={clickHandler}
            className='bg-gray-200 border-gray-400 border flex flex-grow justify-center'>
            <p className='w-5 h-5 text-center'>
                {mineState}
            </p>
        </button>
    )
}

export default MineField
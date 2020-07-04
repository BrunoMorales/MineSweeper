import React, { useState, FC, ReactElement } from "react"

interface mineFieldProps {
    id: string
}

const MineField: FC<mineFieldProps> = ({ id }): ReactElement => {
    const [mineState, setMineState] = useState('H')



    return (
        <button  >
            {mineState}
        </button>
    )
}

export default MineField
import React, { FC, ReactElement } from "react";
interface counterProps {
    mines: number
}
const MineCounter: FC<counterProps> = (mines): ReactElement => {
    return <div>
        <p>
            {mines}
        </p>
    </div>
}

export default MineCounter
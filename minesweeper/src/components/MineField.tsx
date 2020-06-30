import React, { FC, ReactElement } from 'react'
import { MineSquare } from './MineSquare';
import { Game, Mine } from './domain';

export interface MineFieldProps {
    game: Game;
    onLeftClick: (field: Mine) => void;
}
export const MineField: FC<MineFieldProps> = ({ game, onLeftClick }): ReactElement => (
    <div className="game-board">
        {
            game.gameState.map((row, i) => (
                <div key={i} className="board-row">
                    {
                        row.map((field, j) => (
                            <MineSquare key={`${i}-${j}`}
                                index={j + row.length}
                                field={field}
                                onLeftClick={(field) => onLeftClick(field)} />
                        )
                        )
                    }
                </div>
            )
            )
        }
    </div>
);

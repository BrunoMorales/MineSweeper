import React, { FC, ReactElement, useState, useEffect } from "react"
import MineSweeper from "./MineSweeper"
// import mineState from "./mineState";



const Main: FC = (): ReactElement => {
    const [difficulty, setDifficulty] = useState<number>(0)


    return (
        <main >
            <header className="text-center w-full">
                <h1>
                    Buscaminas
                </h1>
                <p>Por <b>Bruno Morales</b></p>
                <p>
                    Dificultad:
                    </p>
                <div>
                    <button onClick={() => setDifficulty(0)}>Fácil</button>
                    <button onClick={() => setDifficulty(1)}>Media</button>
                    <button onClick={() => setDifficulty(2)}>Difícil</button>
                </div>
                <MineSweeper difficulty={difficulty} />
                <button onClick={() => setDifficulty(0)}>
                    Reiniciar
                </button>
            </header>
        </main>
    );
}


export default Main
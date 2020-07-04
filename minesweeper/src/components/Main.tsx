import React, { FC, ReactElement, useState, useEffect } from "react"
import MineSweeper from "./MineSweeper"
// import mineState from "./mineState";



const Main: FC = (): ReactElement => {
    const [difficulty, setDifficulty] = useState<number>(0)


    return (
        <main className='pt-16 h-screen '>
            <header className="text-center mx-auto">
                <h1 className='text-xl'>
                    Buscaminas
                </h1>
                <p>
                    Dificultad:
                </p>
                <div>
                    <button className='bg-green-400 py-1 px-5 rounded-lg' onClick={() => setDifficulty(0)}>Fácil</button>
                    <button className='bg-yellow-400 py-1 px-5 rounded-lg mx-8' onClick={() => setDifficulty(1)}>Media</button>
                    <button className='bg-red-400 py-1 px-5 rounded-lg' onClick={() => setDifficulty(2)}>Difícil</button>
                </div>
                <MineSweeper difficulty={difficulty} />
                <button className='bg-blue-400 py-1 px-5 rounded-lg' onClick={() => setDifficulty(0)}>
                    Reiniciar
                </button>
            </header>
            <p className='text-right mx-10 mt-24'>Por <b>Bruno Morales</b></p>
        </main>
    );
}


export default Main
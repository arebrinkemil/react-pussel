import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { GAME_ROWS, GAME_COLS } from "./config";
import Puzzle from "./components/Puzzle";
import ShuffleButton from "./components/ShuffleButton";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Open Sans", sans-serif;
`;

function App() {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    const totalTiles = GAME_ROWS * GAME_COLS - 1;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => i + 1); //skapar en array med tiles med index + 1

    initialTiles.push(0);

    setTiles(initialTiles.sort(() => Math.random() - 0.5)); //blandar tilesen
  }, []);

  const handleShuffle = () => {
    const initialTiles = tiles.slice();
    setTiles(initialTiles.sort(() => Math.random() - 0.5));
  };

  const handleClick = (index: number) => {
    console.log("Clicked tile", index);
    const blankIndex = tiles.indexOf(0); //hittar tom ruta

    const clickedRow = Math.floor(index / GAME_COLS);
    const clickedColumn = index % GAME_ROWS; //hittar vart klickade rutan är

    const blankRow = Math.floor(blankIndex / GAME_COLS);
    const blankColumn = blankIndex % GAME_ROWS; //hittar vart den tomma rutan är
    console.log(clickedRow, clickedColumn, blankRow, blankColumn);

    if (clickedRow === blankRow || clickedColumn === blankColumn) {
      console.log("Move tile");
    } else {
      console.log("Invalid move");
    }
  };

  return (
    <AppContainer>
      <h1>Number Puzzle</h1>
      <p>Order the numbers in order</p>
      <Puzzle tiles={tiles} onClick={handleClick} />
      <ShuffleButton onShuffle={handleShuffle} />
    </AppContainer>
  );
}

export default App;

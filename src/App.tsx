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
    console.log(totalTiles);
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => i + 1); //skapar en array med tiles med index + 1
    console.log(initialTiles);

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

    //hittar vart klickade rutan är
    const clickedRow = Math.floor(index / GAME_COLS);
    const clickedColumn = index % GAME_ROWS;

    //hittar vart den tomma rutan är
    const blankRow = Math.floor(blankIndex / GAME_COLS);
    const blankColumn = blankIndex % GAME_ROWS;
    console.log(clickedRow, clickedColumn, blankRow, blankColumn);

    if (clickedRow === blankRow || clickedColumn === blankColumn) {
      console.log("Move tile");
      move(index, blankIndex);
    } else {
      console.log("Invalid move");
    }
  };

  const move = (Index: number, blankIndex: number) => {
    const copyTilesArray = [...tiles];
    let direction;
    if (blankIndex < Index) {
      direction = 1;
    } else {
      direction = -1;
    }

    if (
      Math.floor(Index / GAME_COLS) === Math.floor(blankIndex / GAME_COLS) //kollar om de är på samma col
    ) {
      for (let i = blankIndex; i !== Index; i += direction) {
        //flyttar tilesen horisontellt
        copyTilesArray[i] = copyTilesArray[i + direction];
      }
    } else {
      for (let i = blankIndex; i !== Index; i += direction * GAME_COLS) {
        //flyttar tilesen vertikalt
        copyTilesArray[i] = copyTilesArray[i + direction * GAME_COLS];
      }
    }

    copyTilesArray[Index] = 0;
    setTiles(copyTilesArray);
    if (checkWin(copyTilesArray)) {
      console.log("win");
    } else {
      console.log("not win");
    }
  };

  //kollar om tilesen har samma index som deras värde
  function checkWin(tiles: number[]): boolean {
    return tiles.every((tile, index) => {
      if (index === tiles.length - 1) {
        return tile === 0;
      } else {
        return tile === index + 1;
      }
    });
  }
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

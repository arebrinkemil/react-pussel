import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
// import { gameRows, gameCols } from "./config";
import Puzzle from "./components/Puzzle";
import ShuffleButton from "./components/ShuffleButton";
import PuzzleSizeControlls from "./components/PuzzleSizeControlls";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Open Sans", sans-serif;
`;

function App() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [gameRows, setGameRows] = useState(3);
  const [gameCols, setGameCols] = useState(3);

  const setup = () => {
    const totalTiles = gameRows * gameCols - 1;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => i + 1);
    initialTiles.push(0);
    setTiles(initialTiles.sort(() => Math.random() - 0.5)); //blandar tilesen
  };

  useEffect(() => {
    setup();
  }, [gameRows, gameCols]);

  const handleShuffle = () => {
    setup();
  };

  const handleClick = (index: number) => {
    console.log("Clicked tile", index);
    const blankIndex = tiles.indexOf(0); //hittar tom ruta

    //hittar vart klickade rutan är
    const clickedRow = Math.floor(index / gameCols);
    const clickedColumn = index % gameCols;
    //hittar vart den tomma rutan är
    const blankRow = Math.floor(blankIndex / gameCols);
    const blankColumn = blankIndex % gameCols;
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
      Math.floor(Index / gameCols) === Math.floor(blankIndex / gameCols) //kollar om de är på samma col
    ) {
      for (let i = blankIndex; i !== Index; i += direction) {
        //flyttar tilesen horisontellt
        copyTilesArray[i] = copyTilesArray[i + direction];
      }
    } else {
      for (let i = blankIndex; i !== Index; i += direction * gameCols) {
        //flyttar tilesen vertikalt
        copyTilesArray[i] = copyTilesArray[i + direction * gameCols];
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
      <PuzzleSizeControlls
        rows={gameRows}
        columns={gameCols}
        onRowsChange={setGameRows}
        onColumnsChange={setGameCols}
      />
      <Puzzle
        tiles={tiles}
        rows={gameRows}
        columns={gameCols}
        onClick={handleClick}
      />
      <ShuffleButton onShuffle={handleShuffle} />
    </AppContainer>
  );
}
export default App;

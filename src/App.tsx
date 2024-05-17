import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
// import { gameRows, gameCols } from "./config";
import Puzzle from "./components/Puzzle";
import ShuffleButton from "./components/ShuffleButton";
import PuzzleSizeControlls from "./components/PuzzleSizeControlls";
import GlobalStyles from "./globalStyles";
import MessageModal from "./components/MessageModal";
import MovesCounter from "./components/MovesCounter";
import { checkWin } from "./utils/CheckWin";

const AppContainer = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [gameRows, setGameRows] = useState(3);
  const [gameCols, setGameCols] = useState(3);
  const [ModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [numberOfMoves, setNumberOfMoves] = useState(0);

  useEffect(() => {
    setup();
  }, [gameRows, gameCols]);

  const handleShuffle = () => {
    setup();
  };

  const closeModal = () => {
    setModalVisible(false);
    setup();
  };

  const setup = () => {
    const totalTiles = gameRows * gameCols - 1;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => i + 1);
    initialTiles.push(0);
    setTiles(initialTiles.sort(() => Math.random() - 0.5)); //blandar tilesen
    setNumberOfMoves(0);
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
      move(index, blankIndex);
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
        copyTilesArray[i] = copyTilesArray[i + direction];
      } //flyttar tilesen horisontellt
    } else {
      for (let i = blankIndex; i !== Index; i += direction * gameCols) {
        copyTilesArray[i] = copyTilesArray[i + direction * gameCols];
      } //flyttar tilesen vertikalt
    }

    copyTilesArray[Index] = 0;
    setTiles(copyTilesArray);
    setNumberOfMoves(numberOfMoves + 1);
    if (checkWin(copyTilesArray)) {
      setModalMessage("Congratulations! You solved the puzzle!");
      setModalVisible(true);
    }
  };

  return (
    <AppContainer>
      <GlobalStyles />
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
      <MessageModal
        text={modalMessage}
        isVisible={ModalVisible}
        onClose={() => closeModal()}
      />
      <MovesCounter moves={numberOfMoves} />
    </AppContainer>
  );
}
export default App;

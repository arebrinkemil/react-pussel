import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const App: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [gameRows, setGameRows] = useState(3);
  const [gameCols, setGameCols] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [numberOfMoves, setNumberOfMoves] = useState(0);

  const setup = useCallback(() => {
    const totalTiles = gameRows * gameCols - 1;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => i + 1);
    initialTiles.push(0);
    setTiles(initialTiles.sort(() => Math.random() - 0.5)); // blandar tilesen
    setNumberOfMoves(0);
  }, [gameRows, gameCols]);

  useEffect(() => {
    setup();
  }, [setup]);

  const handleShuffle = () => {
    setup();
  };

  const closeModal = () => {
    setModalVisible(false);
    setup();
  };

  const handleClick = (index: number) => {
    console.log("Clicked tile", index);
    const blankIndex = tiles.indexOf(0); // hittar tom ruta

    // hittar vart klickade rutan är
    const clickedRow = Math.floor(index / gameCols);
    const clickedColumn = index % gameCols;
    // hittar vart den tomma rutan är
    const blankRow = Math.floor(blankIndex / gameCols);
    const blankColumn = blankIndex % gameCols;
    console.log(clickedRow, clickedColumn, blankRow, blankColumn);

    if (clickedRow === blankRow || clickedColumn === blankColumn) {
      move(index, blankIndex);
    }
  };

  const move = (index: number, blankIndex: number) => {
    const copyTilesArray = [...tiles];
    const direction = blankIndex < index ? 1 : -1;

    if (Math.floor(index / gameCols) === Math.floor(blankIndex / gameCols)) {
      for (let i = blankIndex; i !== index; i += direction) {
        copyTilesArray[i] = copyTilesArray[i + direction];
      } // flyttar tilesen horisontellt
    } else {
      for (let i = blankIndex; i !== index; i += direction * gameCols) {
        copyTilesArray[i] = copyTilesArray[i + direction * gameCols];
      } // flyttar tilesen vertikalt
    }

    copyTilesArray[index] = 0;
    setTiles(copyTilesArray);
    setNumberOfMoves((prev) => prev + 1);

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
      <BottomContainer>
        <ShuffleButton onShuffle={handleShuffle} />
        <MovesCounter moves={numberOfMoves} />
      </BottomContainer>
      <MessageModal
        text={modalMessage}
        isVisible={modalVisible}
        onClose={closeModal}
      />
    </AppContainer>
  );
};

export default App;

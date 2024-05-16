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
    setTiles(initialTiles.sort(() => Math.random() - 0.5)); //blandar tilesen
  };

  return (
    <AppContainer>
      <h1>Number Puzzle</h1>
      <p>Order the numbers in order</p>
      <Puzzle tiles={tiles} />
      <ShuffleButton onShuffle={handleShuffle} />
    </AppContainer>
  );
}

export default App;

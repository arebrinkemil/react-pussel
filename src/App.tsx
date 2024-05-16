import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { GAME_ROWS, GAME_COLS } from "./config";
import Puzzle from "./components/Puzzle";

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

  return (
    <AppContainer>
      <Puzzle tiles={tiles} />
    </AppContainer>
  );
}

export default App;

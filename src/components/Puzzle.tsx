import React from "react";
import styled from "@emotion/styled";
import { GAME_ROWS, GAME_COLS } from "../config";
import Tile from "./Tile";

interface PuzzleProps {
  tiles: number[];
  onClick: (index: number) => void;
}

const GameGrid = styled.div<{ rows: number; columns: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 5px;
  width: 300px;
  height: 300px;
`;

const Puzzle: React.FC<PuzzleProps> = ({ tiles, onClick }) => {
  return (
    //skapar en grid med rader och kolumner baserat på config.ts
    <GameGrid rows={GAME_ROWS} columns={GAME_COLS}>
      {tiles.map((tile, index) => (
        <Tile key={index} number={tile} onClick={() => onClick(index)} />
      ))}
    </GameGrid>
  );
};

export default Puzzle;

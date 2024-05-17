import React from "react";
import styled from "@emotion/styled";
// import { GAME_ROWS, GAME_COLS } from "../config";
import Tile from "./Tile";

interface PuzzleProps {
  tiles: number[];
  rows: number;
  columns: number;
  onClick: (index: number) => void;
}

const GameGrid = styled.div<{ rows: number; columns: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 5px;
  width: 100%;
  max-width: 70vh;
  aspect-ratio: 1/1;
  border: 1px solid black;
`;

const Puzzle: React.FC<PuzzleProps> = ({ tiles, rows, columns, onClick }) => {
  return (
    //skapar en grid med rader och kolumner baserat på config.ts
    <GameGrid rows={rows} columns={columns}>
      {tiles.map((tile, index) => (
        <Tile key={index} number={tile} onClick={() => onClick(index)} />
      ))}
    </GameGrid>
  );
};

export default Puzzle;

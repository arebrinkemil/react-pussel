import React from "react";
import styled from "@emotion/styled";

interface TileProps {
  number: number;
}

const TileContainer = styled.div<{ isBlank: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tile: React.FC<TileProps> = ({ number }) => {
  return (
    <TileContainer isBlank={number === 0}>
      {number !== 0 ? number : ""}
    </TileContainer>
  );
};

export default Tile;

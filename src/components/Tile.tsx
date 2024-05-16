import React from "react";
import styled from "@emotion/styled";

interface TileProps {
  number: number;
  onClick: () => void;
}

const TileContainer = styled.div<{ isBlank: boolean }>`
  display: flex;

  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isBlank ? "transparent" : "#add9e6"}; //
  &:hover {
    background-color: ${(props) => (props.isBlank ? "transparent" : "#add3ee")};
  }
`;

const Tile: React.FC<TileProps> = ({ number, onClick }) => {
  return (
    <TileContainer onClick={onClick} isBlank={number === 0}>
      {number !== 0 ? number : ""}
    </TileContainer>
  );
};

export default Tile;

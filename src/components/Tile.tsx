import React from "react";
import styled from "@emotion/styled";

interface TileProps {
  number: number;
  onClick: () => void;
}

const TileContainer = styled.div<{ isBlank: boolean }>`
  display: flex;
  font-size: clamp(1rem, 2vw, 4rem);
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBlank ? "transparent" : "#add9e6")};
  height: 100%;
  width: 100%;

  @media (max-width: 600px) {
    font-size: clamp(1rem, 3vw, 3rem);
  }

  @media (min-width: 1200px) {
    font-size: clamp(1rem, 1.5vw, 6rem);
  }

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

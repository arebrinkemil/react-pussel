import React from "react";
import styled from "@emotion/styled";

interface CounterProps {
  moves: number;
}

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
`;

const MovesCounter: React.FC<CounterProps> = ({ moves }) => {
  return (
    <div>
      <h2>Moves: {moves}</h2>
    </div>
  );
};

export default MovesCounter;

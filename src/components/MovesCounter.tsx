import React from "react";
import styled from "@emotion/styled";

interface CounterProps {
  moves: number;
}

const Counter = styled.div`
  padding: 10px 20px;
`;

const MovesCounter: React.FC<CounterProps> = ({ moves }) => {
  return (
    <Counter>
      <h2>Moves: {moves}</h2>
    </Counter>
  );
};

export default MovesCounter;

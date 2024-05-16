import React from "react";
import styled from "@emotion/styled";

interface ShuffleButtonProps {
  onShuffle: () => void;
}

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
`;

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onShuffle }) => {
  return <Button onClick={onShuffle}>Shuffle</Button>;
};

export default ShuffleButton;

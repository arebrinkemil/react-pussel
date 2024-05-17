import React from "react";
import styled from "@emotion/styled";

interface SizeControlsProps {
  rows: number;
  columns: number;
  onRowsChange: (rows: number) => void;
  onColumnsChange: (columns: number) => void;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px;
  font-size: 1em;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
`;

const PuzzleSizeControls: React.FC<SizeControlsProps> = ({
  rows,
  columns,
  onRowsChange,
  onColumnsChange,
}) => {
  const incRow = () => {
    if (rows < 9) onRowsChange(rows + 1);
  };

  const decRow = () => {
    if (rows > 2) onRowsChange(rows - 1);
  };

  const incCol = () => {
    if (columns < 9) onColumnsChange(columns + 1);
  };

  const decCol = () => {
    if (columns > 2) onColumnsChange(columns - 1);
  };

  return (
    <ControlsContainer>
      <ControlGroup>
        <Label>
          <ButtonGroup>
            <Button onClick={decRow}>-</Button>
            <input type="number" value={rows} disabled min="2" max="9" />
            <Button onClick={incRow}>+</Button>
          </ButtonGroup>
        </Label>
      </ControlGroup>
      <h2>X</h2>
      <ControlGroup>
        <Label>
          <ButtonGroup>
            <Button onClick={decCol}>-</Button>
            <input type="number" value={columns} disabled min="2" max="9" />
            <Button onClick={incCol}>+</Button>
          </ButtonGroup>
        </Label>
      </ControlGroup>
    </ControlsContainer>
  );
};

export default PuzzleSizeControls;

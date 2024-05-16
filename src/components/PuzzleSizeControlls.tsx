import React from "react";

interface SizeControllProps {
  rows: number;
  columns: number;
  onRowsChange: (rows: number) => void;
  onColumnsChange: (columns: number) => void;
}

const PuzzleSizeControlls: React.FC<SizeControllProps> = ({
  rows,
  columns,
  onRowsChange,
  onColumnsChange,
}) => {
  return (
    <div>
      <label>
        Rows:
        <input
          type="number"
          value={rows}
          onChange={(e) => onRowsChange(Number(e.target.value))}
          min="2"
          max="10"
        />
      </label>
      <label>
        Columns:
        <input
          type="number"
          value={columns}
          onChange={(e) => onColumnsChange(Number(e.target.value))}
          min="2"
          max="10"
        />
      </label>
    </div>
  );
};

export default PuzzleSizeControlls;

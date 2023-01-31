import { Box } from "@mui/material";

const GridBoard = ({ quantity, start, setHoverSquares, hoverSquares }) => {
  const squares = [];
  for (let row = 0; row < quantity; row++) {
    squares.push([]);
    for (let col = 0; col < quantity; col++) {
      const color = hoverSquares.includes(`Row ${row + 1} Col ${col + 1}`)
        ? "#1976d2"
        : "#fff";
      squares[row].push(
        <Box
          key={`${col}${row}`}
          id={`Row ${row + 1} Col ${col + 1}`}
          sx={{
            backgroundColor: `${color}`,
            border: "1px solid #000",
            minHeight: "32px",
            minWidth: "32px",
          }}
        ></Box>
      );
    }
  }

  const handleMove = (e) => {
    if (start && !!e.target.id) {
      if (!hoverSquares.includes(e.target.id)) {
        return setHoverSquares((prevState) => [...prevState, e.target.id]);
      }
      const idx = hoverSquares.findIndex((square) => square === e.target.id);
      const prevItems = hoverSquares.slice(0, idx);
      const nextItems = hoverSquares.slice(idx + 1);
      setHoverSquares([...prevItems, ...nextItems]);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${quantity}, 1fr)`,
        border: "1px solid #000",
        marginY: "32px",
        minHeight: "406px",
      }}
      onMouseOver={(e) => handleMove(e)}
    >
      {squares}
    </Box>
  );
};

export default GridBoard;

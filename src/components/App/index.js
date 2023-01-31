import { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import GridBoard from "../GridBoard";

function Index() {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [start, setStart] = useState(false);
  const [hoverSquares, setHoverSquares] = useState([]);

  useEffect(() => {
    getRequest().then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedItem(data[0]);
    }
  }, [data]);

  const handleChange = (e) => {
    data.map((dataItem) => {
      if (dataItem.name === e.target.value) {
        setHoverSquares([]);
        setStart(false);
        return setSelectedItem(dataItem);
      }
    });
  };

  const handleReset = () => {
    setHoverSquares([]);
    setStart(false);
  };

  const options =
    data &&
    data.map((option) => {
      return (
        <MenuItem value={option.name} key={option.name}>
          {option.name}
        </MenuItem>
      );
    });

  return (
    <Grid container>
      <Grid m={4}>
        <Stack spacing={3} direction="row" justifyContent="flex-start">
          <Select
            id="level"
            labelId="level"
            value={selectedItem?.name || ""}
            onChange={handleChange}
            sx={{ minWidth: "200px" }}
          >
            {options}
          </Select>
          <Button variant="contained" onClick={() => setStart(!start)}>
            {start ? "Finish" : "Start"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            sx={{ minWidth: "72px" }}
          >
            Reset
          </Button>
        </Stack>
        <GridBoard
          quantity={selectedItem?.field}
          start={start}
          setHoverSquares={setHoverSquares}
          hoverSquares={hoverSquares}
        />
      </Grid>
      <Grid>
        <Typography variant="h4" marginY={4}>
          Hover Squares
        </Typography>
        <Stack spacing={1}>
          {hoverSquares.map((hoverSquare) => (
            <Alert icon={false} key={hoverSquare} severity="warning">
              {hoverSquare}
            </Alert>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Index;

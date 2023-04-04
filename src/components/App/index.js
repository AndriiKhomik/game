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
    return () => setData([]);
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedItem(data[0]);
    }
    return () => setSelectedItem(null);
  }, [data]);

  const handleChange = (e) => {
    data.map((dataItem) => {
      if (dataItem.name === e.target.value) {
        setHoverSquares([]);
        setStart(false);
        return setSelectedItem(dataItem);
      }
      return null;
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
    <>
      <Grid container>
        <Grid m={3}>
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
            <Button
              variant="contained"
              onClick={() => setStart(!start)}
              sx={{ minWidth: "96px" }}
            >
              {start ? "Finish" : "Start"}
            </Button>
            <Button variant="outlined" color="error" onClick={handleReset}>
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
        <Grid m={3}>
          <Typography variant="h4" mb={4} mt={1}>
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
    </>
  );
}

export default Index;

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface IFilterMenuProps {}
const FilterMenu = ({}: IFilterMenuProps) => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
      <Select sx={{ borderRadius: 3 }} value={age} onChange={handleChange} fullWidth label="Age">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Twenty</MenuItem>
        <MenuItem value={21}>Twenty one</MenuItem>
        <MenuItem value={22}>Twenty one and a half</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterMenu;

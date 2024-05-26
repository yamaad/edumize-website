import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { AirTableQueryBody } from "../../services/airTable/types";
import { useGetFilterOptionListMutation } from "../../services/airTable/airTable";

//-------------
// interfaces
//-------------
interface IFilterMenuProps {
  fieldName: string;
  label: string;
  onFilter: (value: string) => void;
}
//-------------
// component
//-------------
const FilterMenu = ({ fieldName, label, onFilter }: IFilterMenuProps) => {
  //-------------
  // local states
  //-------------
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterList, setFilterList] = useState<string[]>([]);

  //-------------
  // hooks
  //-------------
  const [getFilterOptionList, { data, isLoading, isSuccess }] = useGetFilterOptionListMutation();

  //-------------
  // constants
  //-------------
  const filterListQueryBody: AirTableQueryBody = {
    pageSize: 100,
    fields: [fieldName],
    filterByFormula:
      filterList.length > 0
        ? filterList.length === 1
          ? `TRIM(LOWER({${fieldName}})) != TRIM(LOWER("${filterList[0]}"))`
          : `AND(
    ${filterList.map(value => `TRIM(LOWER({${fieldName}})) != TRIM(LOWER("${value}"))`).join(",")})`
        : "",
  };

  //-------------
  // handlers
  //-------------
  const handleChange = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value);
    onFilter(event.target.value);
  };
  //-------------
  // triggers
  //-------------
  useEffect(() => {
    getFilterOptionList(filterListQueryBody);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      const { filterOptions } = data;
      if (data.offset) setFilterList(prev => [...prev, ...filterOptions]);
      if (!data.offset) setFilterList(prev => [...prev, ...filterOptions].filter((value: string) => value.length));
    }
  }, [data]);
  useEffect(() => {
    if (data?.offset) getFilterOptionList(filterListQueryBody);
  }, [filterList]);

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{ borderRadius: 6, backgroundColor: "#eff4f7", height: "50px" }}
        value={isLoading ? "loading..." : filterList.length <= 0 ? "no option available" : filterValue}
        disabled={filterList.length <= 0 || isLoading}
        onChange={handleChange}
        fullWidth
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {filterList.length > 0 && !isLoading ? (
          filterList.map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))
        ) : (
          <MenuItem value={isLoading ? "loading..." : "no option available"}>{isLoading ? "loading..." : "no option available"}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default FilterMenu;

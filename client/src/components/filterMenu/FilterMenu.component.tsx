import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AirTableQueryBody } from "../../redux/course/airtable.model";
import { useGetFilterOptionListMutation } from "redux/dynamicFilters/filterApi";
import { useTranslation } from "react-i18next";
import { LangContext } from "context/langContext";

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
  const { t } = useTranslation();
  const lang = useContext(LangContext);
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
    <FormControl
      fullWidth
      sx={{
        ".MuiInputLabel-shrink": { top: "3px" },
      }}
    >
      <InputLabel
        sx={{
          fontSize: "12px",
          top: "-7px",
          right: lang === "ar" ? 30 : "unset",
          left: lang === "ar" ? "unset" : 0,
          "&$focused": {
            right: lang === "ar" ? 20 : "unset",
            left: lang === "ar" ? "unset" : 0,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        sx={{
          borderRadius: 6,
          backgroundColor: "primary.100",
          fontSize: "12px",
          ".MuiInputBase-input": { p: 1 },
          ".MuiSelect-icon": {
            right: lang === "ar" ? "unset" : 7,
            left: lang === "ar" ? 7 : "unset",
          },
          "& legend": { textAlign: lang === "ar" ? "right" : "left", mr: "18px" },
        }}
        value={isLoading ? "loading..." : filterList.length <= 0 ? t("no option available") : filterValue}
        disabled={filterList.length <= 0 || isLoading}
        onChange={handleChange}
        fullWidth
        label={label}
        MenuProps={{ sx: { direction: "ltr", maxHeight: "400px" } }}
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
          <MenuItem value={isLoading ? t("Loading") + "..." : t("no option available")}>
            {isLoading ? t("Loading") + "..." : t("no option available")}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default FilterMenu;

import { Divider, IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

//--------------
// interfaces
//--------------
export type SortDirection = "asc" | "desc";
export interface SortItem {
  field: string;
  direction: SortDirection;
}
export interface SortOption {
  label: string;
  value: SortItem;
}
export interface SortProps {
  sortItems: SortOption[];
  onSelectSort: (value: SortItem) => void;
}
interface ISearchBarProps {
  sortProps?: SortProps;
  onSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}
//--------------
// component
//--------------

const SearchBar = ({ sortProps, onSearch }: ISearchBarProps) => {
  //--------------
  // local states
  //--------------
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<null | HTMLElement>(null);

  //--------------
  // handlers
  //--------------
  const openSortMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const openCurrencyMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrencyAnchorEl(event.currentTarget);
  };

  const handleSortChange = (value: SortItem) => {
    sortProps?.onSelectSort(value);
    setSortAnchorEl(null);
  };
  const handleCurrencyChange = () => {
    setCurrencyAnchorEl(null);
  };

  return (
    <Paper component="form" sx={{ p: 0.5, borderRadius: 3, display: "flex", alignItems: "center", borderColor: "#005360" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search for Program Name..." onChange={onSearch} />
      <IconButton onClick={openCurrencyMenu} color="secondary" sx={{ p: 1 }}>
        <CurrencyExchangeIcon />
      </IconButton>
      <Menu
        anchorEl={currencyAnchorEl}
        open={Boolean(currencyAnchorEl)}
        onClose={() => setCurrencyAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCurrencyChange}>currency</MenuItem>
        <MenuItem onClick={handleCurrencyChange}>currency</MenuItem>
        <MenuItem onClick={handleCurrencyChange}>currency</MenuItem>
      </Menu>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={openSortMenu} color="primary" sx={{ p: 1 }}>
        <SwapVertIcon sx={{ border: "1px solid", borderRadius: 1 }} />
      </IconButton>
      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => setSortAnchorEl(null)}>
        {sortProps &&
          sortProps.sortItems.map((item: SortOption, index: number) => (
            <MenuItem key={index} value={item.label} onClick={() => handleSortChange(item.value)}>
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </Paper>
  );
};

export default SearchBar;

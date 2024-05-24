import { Divider, IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

export interface SortItem {
  label: string;
  field: string;
  direction: string;
}
interface ISearchBarProps {
  sortItems?: SortItem[];
  onSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}
const SearchBar = ({ sortItems, onSearch }: ISearchBarProps) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<null | HTMLElement>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleCurrencyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrencyAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => setSortAnchorEl(null);
  const handleCurrencyClose = () => setCurrencyAnchorEl(null);
  return (
    <Paper component="form" sx={{ p: 0.5, borderRadius: 3, display: "flex", alignItems: "center" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search for Program Name..." onChange={onSearch} />
      <IconButton onClick={handleCurrencyClick} color="secondary" sx={{ p: 1 }}>
        <CurrencyExchangeIcon />
      </IconButton>
      <Menu
        anchorEl={currencyAnchorEl}
        open={Boolean(currencyAnchorEl)}
        onClose={handleCurrencyClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCurrencyClose}>currency</MenuItem>
        <MenuItem onClick={handleCurrencyClose}>currency</MenuItem>
        <MenuItem onClick={handleCurrencyClose}>currency</MenuItem>
      </Menu>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={handleSortClick} color="primary" sx={{ p: 1 }}>
        <SwapVertIcon sx={{ border: "1px solid", borderRadius: 1 }} />
      </IconButton>
      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose}>
        {sortItems &&
          sortItems.map((item: SortItem, index: number) => (
            <MenuItem key={index} onClick={handleSortClose}>
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </Paper>
  );
};

export default SearchBar;

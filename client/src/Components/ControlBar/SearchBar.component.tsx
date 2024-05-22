import { Divider, IconButton, InputBase, Menu, MenuItem, Paper } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

interface ISearchBarProps {}
const SearchBar = ({}: ISearchBarProps) => {
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
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search for Program Name..." />
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
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSortClose}>Most Wanted</MenuItem>
        <MenuItem onClick={handleSortClose}>Price Low to High</MenuItem>
        <MenuItem onClick={handleSortClose}>Price High to Low</MenuItem>
      </Menu>
    </Paper>
  );
};

export default SearchBar;

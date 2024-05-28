import { Divider, IconButton, InputAdornment, InputBase, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ChangeEvent, useRef, useState } from "react";
import { useGetCurrencyQuery, useGetCurrencyRateQuery } from "redux/services/edumizeApi/currency/currency";
import { setSelectedCurrency } from "redux/features/currencySlice";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "redux/store";

// map state to props
const mapStateToProps = (state: RootState) => ({
  selectedCurrency: state.currency,
});

// map dispatch to props
const mapDispatchToProps = {
  setSelectedCurrency,
};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;
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
interface ISearchBarProps extends PropsFromRedux {
  sortProps?: SortProps;
  onSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}
//--------------
// component
//--------------

const SearchBar = ({ sortProps, onSearch, selectedCurrency, setSelectedCurrency }: ISearchBarProps) => {
  //--------------
  // local states
  //--------------
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSortIndex, setSelectedSortIndex] = useState<number>();
  const [openCurrencySelect, setOpenCurrencySelect] = useState<boolean>(false);
  //--------------
  // hooks
  //--------------
  const { currentData: currencyList } = useGetCurrencyQuery();
  const { currentData: currencyRateList } = useGetCurrencyRateQuery();
  const currencySelectRef = useRef<HTMLInputElement | null>(null);
  //--------------
  // handlers
  //--------------
  const openSortMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortChange = (value: SortItem, index: number) => {
    setSelectedSortIndex(index);
    sortProps?.onSelectSort(value);
    setSortAnchorEl(null);
  };
  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedCurrency(currencyRateList ? { currency: event.target.value, rate: currencyRateList[event.target.value] } : selectedCurrency);
  };

  return (
    <Paper component="form" sx={{ px: 2, borderRadius: 6, display: "flex", alignItems: "center", backgroundColor: "#eff4f7" }}>
      <InputBase sx={{ ml: 1, flex: 1, fontSize: "12px" }} placeholder="Course Name..." onChange={onSearch} />
      <TextField
        select
        value={selectedCurrency.currency}
        onChange={handleCurrencyChange}
        onClick={() => setOpenCurrencySelect(prev => !prev)}
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment disablePointerEvents position="start">
              <CurrencyExchangeIcon color="secondary" fontSize="small" />
            </InputAdornment>
          ),
        }}
        SelectProps={{
          renderValue: () => <Typography fontSize="12px">{selectedCurrency.currency}</Typography>,
          ref: currencySelectRef,
          open: openCurrencySelect,
          onClose: () => {
            currencySelectRef.current?.classList.remove("Mui-focused");
          },
          sx: {
            borderRadius: 6,
            fontSize: "12px",
            height: "30px",
          },
        }}
      >
        {currencyList &&
          Object.keys(currencyList).map((value: string, index) => (
            <MenuItem key={index} value={value}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>{value} </strong> ({currencyList[value]})
              </Typography>
            </MenuItem>
          ))}
        {!currencyList && (
          <MenuItem value={selectedCurrency.currency}>
            <Typography sx={{ fontSize: "12px" }}>
              <strong>{selectedCurrency.currency} </strong>
            </Typography>
          </MenuItem>
        )}
      </TextField>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={openSortMenu} color="primary" sx={{ p: 1 }}>
        <SwapVertIcon sx={{ border: "1px solid", borderRadius: 1 }} />
      </IconButton>
      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => setSortAnchorEl(null)}>
        {sortProps &&
          sortProps.sortItems.map((item: SortOption, index: number) => (
            <MenuItem
              selected={selectedSortIndex === index}
              disabled={selectedSortIndex === index}
              key={index}
              value={item.label}
              onClick={() => handleSortChange(item.value, index)}
            >
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </Paper>
  );
};

export { SearchBar };
export default connector(SearchBar);

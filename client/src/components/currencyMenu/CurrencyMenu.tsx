import { InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { setSelectedCurrency } from "redux/currency/currency.slice";
import { RootState } from "redux/store";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useGetCurrencyQuery, useGetCurrencyRateQuery } from "redux/currency/currency.api";

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

interface ICurrencyMenuProps extends PropsFromRedux {}
//--------------
// component
//--------------

const CurrencyMenu = ({ selectedCurrency, setSelectedCurrency }: ICurrencyMenuProps) => {
  //--------------
  // local states
  //--------------
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
  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedCurrency(currencyRateList ? { currency: event.target.value, rate: currencyRateList[event.target.value] } : selectedCurrency);
  };
  return (
    <TextField
      select
      value={selectedCurrency.currency}
      onChange={handleCurrencyChange}
      onClick={() => setOpenCurrencySelect(prev => !prev)}
      color="primary"
      sx={{ maxWidth: "fit-content" }}
      InputProps={{
        startAdornment: (
          <InputAdornment disablePointerEvents position="start">
            <CurrencyExchangeIcon color="secondary" sx={{ fontSize: "16px" }} />
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
        MenuProps: {
          sx: { maxHeight: "450px" },
        },
        sx: {
          borderRadius: 6,
          fontSize: "10px",
          height: "25px",
          backgroundColor: "primary.100",
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
  );
};
export { CurrencyMenu };
export default connector(CurrencyMenu);

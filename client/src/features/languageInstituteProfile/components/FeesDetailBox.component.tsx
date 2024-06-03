import { Box, Button, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
import CurrencyMenu from "components/currencyMenu/CurrencyMenu";
import { useEffect, useState } from "react";
import { RootState } from "redux/store";

// map state to props
const mapStateToProps = (state: RootState) => ({
  selectedCourse: state.institute.selectedCourse,
  selectedCourseFee: state.institute.selectedCourseFee,
  selectedCurrency: state.currency.currency,
  selectedCurrencyRate: state.currency.rate,
});

// map dispatch to props
const mapDispatchToProps = {};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;

//--------------
// interfaces
//--------------
interface FeesDetailBoxProps extends PropsFromRedux {}
//---------------
// component
//---------------
const FeesDetailBox = ({ selectedCourse, selectedCourseFee, selectedCurrency, selectedCurrencyRate }: FeesDetailBoxProps) => {
  //---------------
  // local states
  //---------------
  const [totalFee, setTotalFee] = useState<number>(0);
  const [isEdumizePickup, setIsEdumizePickup] = useState<boolean>(false);
  const [isEdumizeDiscount, setIsEdumizeDiscount] = useState<boolean>(false);
  //---------------
  // constants
  //---------------
  const mapFeeListToTitles = [
    { title: "Registration Fees", fee: selectedCourseFee?.registrationFee || "Free" },
    { title: "Placement Test", fee: selectedCourseFee?.placementTest || "Free" },
    { title: "Student Visa & Medical Insurance", fee: selectedCourseFee?.visaAndInsurance || "Not Offered" },
    { title: "Books & Materials", fee: selectedCourseFee?.booksAndMaterials || "Free" },
    {
      title: "Airport & Immigration Clearance and Airport Pickup",
      fee: selectedCourseFee?.immigrationClearanceAndAirportPickUp || "Not Offered",
    },
  ];
  //---------------
  // triggers
  //---------------
  useEffect(() => {
    if (selectedCourseFee) {
      setTotalFee(
        selectedCourseFee.registrationFee +
          selectedCourseFee.placementTest +
          selectedCourseFee.visaAndInsurance +
          selectedCourseFee.booksAndMaterials +
          selectedCourseFee.immigrationClearanceAndAirportPickUp +
          (isEdumizePickup ? Number(import.meta.env.VITE_EDUMIZE_PICKUP_FEE) || 600 : 0) +
          (isEdumizeDiscount
            ? selectedCourseFee.discountedFee - selectedCourseFee.edumizeDiscountRate * selectedCourseFee.discountedFee
            : selectedCourseFee.discountedFee)
      );
    }
  }, [selectedCourseFee, isEdumizePickup, isEdumizeDiscount]);
  useEffect(() => {
    if (!selectedCourseFee?.immigrationClearanceAndAirportPickUp) {
      setIsEdumizePickup(true);
    } else {
      setIsEdumizePickup(false);
    }
  }, [selectedCourseFee]);
  return (
    <>
      {selectedCourseFee && (
        <Stack bgcolor="primary.100" borderRadius={2.5} py={3} px={4} gap={3}>
          <Stack gap={2}>
            <Typography textAlign="center" variant="h5" color="primary.900">
              100% No Hidden Fees
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
              <Typography variant="h6" color={"primary.900"}>
                {selectedCourse?.name}
              </Typography>
              <Typography variant="h6" color="content.500">
                for
              </Typography>
              <Typography variant="h6" color={"primary.900"}>
                {selectedCourseFee.duration} Months
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="bodyBold" color="content.500">
                Tuition Fees:
              </Typography>
              <CurrencyMenu />
            </Stack>
            <Stack alignItems={"center"}>
              <Box position="relative" ml={-20}>
                <Typography
                  variant="bodyBoldXS"
                  color="secondary.400"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    "::before, ::after": {
                      content: '""',
                      position: "absolute",
                      top: 8,
                      left: -5,
                      width: "65px",
                      height: "1px",
                      backgroundColor: "primary.900",
                      transformOrigin: "center",
                      transform: "rotate(-7deg)",
                    },
                  }}
                >
                  {selectedCurrency} {` `}
                  {Math.ceil(selectedCourseFee.originalFee * selectedCurrencyRate).toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="h4" color={"primary.900"}>
                {selectedCurrency} {` `}
                {Math.ceil(
                  (isEdumizeDiscount
                    ? selectedCourseFee.discountedFee - selectedCourseFee.edumizeDiscountRate * selectedCourseFee.discountedFee
                    : selectedCourseFee.discountedFee) * selectedCurrencyRate
                ).toLocaleString()}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                maxWidth: "fit-content",
                alignSelf: "center",
                textTransform: "capitalize",
                color: "content.0",
                fontWeight: 600,
                boxShadow: 6,
                borderRadius: 3,
              }}
              disabled={isEdumizeDiscount}
              onClick={() => setIsEdumizeDiscount(true)}
            >
              Claim Edumize Additional Discount
            </Button>
          </Stack>
          <Stack gap={2}>
            {mapFeeListToTitles.map((value, index) => (
              <Stack key={index} direction={"row"} gap={4} justifyContent={"space-between"}>
                <Typography variant="bodyNormal" color="content.500" sx={{ whiteSpace: "wrap" }}>
                  {value.title}
                </Typography>
                <Typography variant="bodyNormal" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                  {typeof value.fee === "number" ? selectedCurrency + " " + Math.ceil(value.fee * selectedCurrencyRate).toLocaleString() : value.fee}
                </Typography>
              </Stack>
            ))}

            <Stack
              direction={"row"}
              gap={4}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ textDecoration: !!selectedCourseFee?.immigrationClearanceAndAirportPickUp ? "line-through" : "none" }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox
                  disabled={!!selectedCourseFee?.immigrationClearanceAndAirportPickUp}
                  checked={isEdumizePickup}
                  onChange={event => setIsEdumizePickup(event.target.checked)}
                  color="secondary"
                />
                <Typography variant="bodyNormal" color="content.500" sx={{ whiteSpace: "wrap" }}>
                  Edumize Airport Pickup
                </Typography>
              </Stack>
              <Typography variant="bodyNormal" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                {selectedCurrency + " " + Math.ceil(import.meta.env.VITE_EDUMIZE_PICKUP_FEE || 600 * selectedCurrencyRate).toLocaleString()}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Divider sx={{ border: "1px solid", opacity: 0.35 }} />
            <Typography variant="bodyBold" color={"content.500"}>
              Total for the entire duration: <br />
              {selectedCurrency} {` `}
              {Math.ceil(totalFee * selectedCurrencyRate).toLocaleString()}
            </Typography>
            {isEdumizeDiscount && (
              <Typography variant="bodyLight" color={"secondary"}>
                Edumize Discount Applied Successfully
              </Typography>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
};
export { FeesDetailBox };
export default connector(FeesDetailBox);

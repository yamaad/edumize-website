import { Alert, Box, Button, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "redux/store";
import CurrencyMenu from "components/currencyMenu/CurrencyMenu";
import { useEffect, useState } from "react";
import VerifyEmailDialog from "components/dialogs/VerifyEmailDialog";
import { SkeletonWrapper } from "components/skeletonWrapper/SkeletonWrapper.component";

// map state to props
const mapStateToProps = (state: RootState) => ({
  currentInstitute: state.institute.currentInstitute,
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
const FeesDetailBox = ({ currentInstitute, selectedCourse, selectedCourseFee, selectedCurrency, selectedCurrencyRate }: FeesDetailBoxProps) => {
  //---------------
  // local states
  //---------------
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [totalFee, setTotalFee] = useState<number>(0);
  const [isEdumizePickup, setIsEdumizePickup] = useState<boolean>(false);
  const [isEdumizeDiscount, setIsEdumizeDiscount] = useState<boolean>(false);
  const [discountClaimTimes, setIsDiscountClaimTimes] = useState<number>(0);

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
  // handler
  //---------------
  const handleOnVerified = () => {
    setIsEdumizeDiscount(true);
    setIsDiscountClaimTimes(1);
  };
  const handleOnClaimDiscount = () => {
    if (discountClaimTimes < 1 || discountClaimTimes > 2) {
      setShowDialog(true);
    } else {
      setIsDiscountClaimTimes(prev => prev + 1);
      setIsEdumizeDiscount(true);
    }
  };
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
    setIsEdumizeDiscount(false);
    if (!selectedCourseFee?.immigrationClearanceAndAirportPickUp) {
      setIsEdumizePickup(true);
    } else {
      setIsEdumizePickup(false);
    }
  }, [selectedCourseFee]);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        disabled={!selectedCourseFee}
        sx={{
          color: "content.0",
          textTransform: "capitalize",
          borderRadius: 6,
          width: "fit-content",
          px: 3,
          py: 1,
          position: "fixed",
          bottom: 16,
          left: { xs: "30vw", sm: "35vw", md: "40vw", lg: "45vw" },
          zIndex: 10,
        }}
        onClick={() => {
          const encodedMessage = encodeURIComponent(
            `Package Request For:\n*${currentInstitute?.name}*\ncourse: *${selectedCourse?.name}*\nfor *${
              selectedCourseFee?.duration
            }* months\nTotal fee: *RM ${totalFee.toLocaleString()}*${isEdumizePickup ? "\n`includes Edumize Pick up`" : ""}${
              isEdumizeDiscount ? "\n`includes Edumize Additional Discount`" : ""
            }`
          );

          window.open(`${import.meta.env.VITE_EDUMIZE_WHATSAPP_URL}${encodedMessage}`, "_self");
        }}
      >
        Request Package
      </Button>
      <Stack bgcolor="primary.100" borderRadius={2.5} py={3} px={4} gap={3}>
        <Stack gap={2}>
          <Typography textAlign="center" variant="h5" color="primary.900">
            100% No Hidden Fees
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
            <SkeletonWrapper condition={selectedCourse}>
              <Typography variant="h6" color={"primary.900"}>
                {selectedCourse?.name || "name"}
              </Typography>
            </SkeletonWrapper>
            <SkeletonWrapper condition={selectedCourseFee}>
              <Typography variant="h6" color="content.500">
                for
              </Typography>
              <Typography variant="h6" color={"primary.900"}>
                {selectedCourseFee?.duration} Months
              </Typography>
            </SkeletonWrapper>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="bodyBold" color="content.500">
              Tuition Fees:
            </Typography>
            <SkeletonWrapper condition={selectedCourseFee}>
              <CurrencyMenu />
            </SkeletonWrapper>
          </Stack>
          <Stack alignItems={"center"}>
            {selectedCourseFee?.originalFee !== selectedCourseFee?.discountedFee && (
              <SkeletonWrapper condition={selectedCourseFee}>
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
                    {Math.ceil(selectedCourseFee?.originalFee || 0 * selectedCurrencyRate).toLocaleString()}
                  </Typography>
                </Box>
              </SkeletonWrapper>
            )}
            <SkeletonWrapper condition={selectedCourseFee}>
              <Typography variant="h4" color={"primary.900"}>
                {selectedCurrency} {` `}
                {selectedCourseFee &&
                  Math.ceil(
                    (isEdumizeDiscount
                      ? selectedCourseFee.discountedFee - selectedCourseFee.edumizeDiscountRate * selectedCourseFee.discountedFee
                      : selectedCourseFee.discountedFee) * selectedCurrencyRate
                  ).toLocaleString()}
              </Typography>
            </SkeletonWrapper>
          </Stack>
          <Stack alignSelf={"center"}>
            <SkeletonWrapper condition={selectedCourseFee}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  maxWidth: "fit-content",
                  textTransform: "capitalize",
                  color: "content.0",
                  fontWeight: 600,
                  boxShadow: 6,
                  borderRadius: 3,
                }}
                disabled={isEdumizeDiscount || !selectedCourseFee?.edumizeDiscountRate}
                onClick={handleOnClaimDiscount}
              >
                Claim Edumize Additional Discount
              </Button>
            </SkeletonWrapper>
          </Stack>
        </Stack>

        <Stack gap={2}>
          <SkeletonWrapper condition={selectedCourseFee}>
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
          </SkeletonWrapper>
        </Stack>

        <Stack gap={1}>
          <Divider sx={{ border: "1px solid", opacity: 0.35 }} />
          <SkeletonWrapper condition={selectedCourseFee}>
            <Typography variant="bodyBold" color={"content.500"}>
              Total for the entire duration: <br />
              {selectedCurrency} {` `}
              {Math.ceil(totalFee * selectedCurrencyRate).toLocaleString()}
            </Typography>
          </SkeletonWrapper>

          {isEdumizeDiscount && (
            <Alert variant="filled" severity="success">
              Edumize Discount Applied Successfully
            </Alert>
          )}
        </Stack>
      </Stack>
      <VerifyEmailDialog showDialog={showDialog} setShowDialog={setShowDialog} onVerified={handleOnVerified} />
    </>
  );
};
export { FeesDetailBox };
export default connector(FeesDetailBox);

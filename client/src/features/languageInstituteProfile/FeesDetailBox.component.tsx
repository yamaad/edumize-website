import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
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
  // constant
  //---------------
  const mapFeeListToTitles = [
    { title: "Registration Fees", fee: selectedCourseFee?.registrationFee || "Free" },
    { title: "Placement Test", fee: selectedCourseFee?.placementTest || "Free" },
    { title: "Student Visa & Medical Insurance  ", fee: selectedCourseFee?.visaAndInsurance || "Not Offered" },
    { title: "Books & Materials", fee: selectedCourseFee?.booksAndMaterials || "Free" },
  ];
  return (
    <>
      {selectedCourseFee && (
        <Stack bgcolor="primary.100" borderRadius={2.5} py={3} px={4} gap={3}>
          <Stack gap={2}>
            <Typography textAlign="center" variant="h5" color="primary.900">
              100% No Hidden Fees
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
              <Typography variant="bodySemibold" color={"primary.900"}>
                {selectedCourse?.name}
              </Typography>
              <Typography variant="bodyBold" color="content.500">
                for
              </Typography>
              <Typography variant="bodySemibold" color={"primary.900"}>
                {selectedCourseFee.duration} Months
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography variant="bodyBold" color="content.500">
              Tuition Fees:
            </Typography>
            <Stack alignItems={"center"}>
              <Box position="relative" ml={-15}>
                <Typography
                  color="secondary.400"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    "::before, ::after": {
                      content: '""',
                      position: "absolute",
                      top: 7,
                      left: 6,
                      width: "47px",
                      height: "1px",
                      backgroundColor: "primary.900",
                      transformOrigin: "center",
                      transform: "rotate(-9deg)",
                    },
                  }}
                >
                  {selectedCourseFee.originalFee}
                </Typography>
              </Box>

              <Typography variant="h6" color={"primary.900"}>
                {selectedCourseFee.discountedFee}
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
                boxShadow: 6,
              }}
            >
              Claim Edumize Additional Discount
            </Button>
          </Stack>
          <Stack gap={2}>
            {mapFeeListToTitles.map((value, index) => (
              <Stack key={index} direction={"row"} gap={4} justifyContent={"space-between"}>
                <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                  {value.title}
                </Typography>
                <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                  {typeof value.fee === "number" ? selectedCurrency + " " + Math.ceil(value.fee * selectedCurrencyRate).toLocaleString() : value.fee}
                </Typography>
              </Stack>
            ))}
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                {}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                {/* {typeof value.fee === "number" ? selectedCurrency + " " + Math.ceil(value.fee * selectedCurrencyRate).toLocaleString() : value.fee} */}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Divider sx={{ border: "1px solid", opacity: 0.35 }} />
            <Typography variant="bodyBold" color={"content.500"}>
              Total for the entire duration: <br />
              [[MYR 20,000]]
            </Typography>
            <Typography variant="bodyLight" color={"secondary"}>
              Edumize Discount Applied Successfully
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
};
export { FeesDetailBox };
export default connector(FeesDetailBox);

import { Box, Button, Card, CardActionArea, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import CurrencyMenu from "components/currencyMenu/CurrencyMenu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//--------------
// interfaces
//--------------
interface ILanguageInstituteCourseCard {}
//---------------
// component
//---------------
const LanguageInstituteCourseCard = ({}: ILanguageInstituteCourseCard) => {
  //-------------
  // local states
  //-------------

  //-------------
  // hooks
  //-------------

  //-------------
  // constants
  //-------------

  //-------------
  // triggers
  //-------------

  //-------------
  // handlers
  //-------------

  return (
    <Stack borderRadius={2} p={1} gap={2} maxWidth={"100%"}>
      <Stack direction={"row"} gap={4} justifyContent="space-between">
        <Stack flexGrow={1} gap={3}>
          <Typography variant="h5" color="primary.900">
            [[ELS Language Centre]]
          </Typography>
          <CurrencyMenu />
          <Stack gap={1}>
            <Typography variant="h6" color="content.500">
              Course
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
              <Card elevation={1} sx={{ backgroundColor: "primary.100", borderRadius: 2, width: "fit-content", height: "fit-content" }}>
                <CardActionArea sx={{ px: 1, py: 2 }}>
                  <CardContent sx={{ px: 0, py: 0, width: "fit-content" }}>
                    <Typography>[[IEP - 5hrs]]</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card elevation={1} sx={{ backgroundColor: "primary.100", borderRadius: 2, width: "fit-content", height: "fit-content" }}>
                <CardActionArea sx={{ px: 1, py: 2 }}>
                  <CardContent sx={{ px: 0, py: 0, width: "fit-content" }}>
                    <Typography>[[IEP - 5hrs]]</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card elevation={1} sx={{ backgroundColor: "primary.100", borderRadius: 2, width: "fit-content", height: "fit-content" }}>
                <CardActionArea sx={{ px: 1, py: 2 }}>
                  <CardContent sx={{ px: 0, py: 0, width: "fit-content" }}>
                    <Typography>[[IELTS Preparation]]</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card elevation={1} sx={{ backgroundColor: "primary.100", borderRadius: 2, width: "fit-content", height: "fit-content" }}>
                <CardActionArea sx={{ px: 1, py: 2 }}>
                  <CardContent sx={{ px: 0, py: 0, width: "fit-content" }}>
                    <Typography>[[IEP - 5hrs]]</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Stack>
          <Stack gap={1} flexGrow={1}>
            <Typography variant="h6" color="content.500">
              Months
            </Typography>
            <Stack alignItems={"center"} sx={{ backgroundColor: "primary.100", borderRadius: 2, py: 1 }}>
              <IconButton color="secondary" sx={{ height: 40, width: 40 }}>
                <ArrowDropUpIcon sx={{ fontSize: "60px" }} />
              </IconButton>
              <Typography variant="h5" color="primary.900">
                [[2]]
              </Typography>
              <IconButton color="secondary" sx={{ height: 40, width: 40 }}>
                <ArrowDropDownIcon sx={{ fontSize: "60px" }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <Stack bgcolor="primary.100" borderRadius={2.5} py={3} px={4} gap={3}>
          <Stack gap={2}>
            <Typography textAlign="center" variant="h6" color="primary.900">
              100% No Hidden Fees
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
              <Typography variant="bodySemibold" color={"primary.900"}>
                [[IEP-5hrs]]
              </Typography>
              <Typography variant="bodyBold" color="content.500">
                for
              </Typography>
              <Typography variant="bodySemibold" color={"primary.900"}>
                {" "}
                [[2]] Months
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
                  [[RM 13,000]]
                </Typography>
              </Box>

              <Typography variant="h5" color={"primary.900"}>
                {" "}
                [[RM 10,000]]
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
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Registration Fees]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Registration Fees]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Registration Fees]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Student Visa & Medical Insurance]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Registration Fees]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "wrap" }}>
                [[Airport & Immigration Clearance and Pickup]]{" "}
              </Typography>
              <Typography variant="bodyLight" color="content.500" sx={{ whiteSpace: "nowrap" }}>
                [[MYR 2000]]{" "}
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
      </Stack>
      <Stack gap={0.5}>
        <Stack bgcolor="secondary.100" borderRadius={2.5} p={2}>
          <Typography variant="bodyBold" color={"primary.900"}>
            Tuition Fees:
          </Typography>
          <Typography variant="bodyLight" color={"primary.900"}>
            [[Apply for 6-Months and Get 1 extra month Tuition waiver, Free IELTS test fee, ..etc]]
          </Typography>
        </Stack>
        <Typography
          variant="bodyLight"
          color="primary.main"
          component="a"
          href="https://www.google.com"
          sx={{ alignSelf: "start", fontWeight: 300, textDecoration: "none" }}
        >
          Terms & Conditions
        </Typography>
      </Stack>
    </Stack>
  );
};

export { LanguageInstituteCourseCard };

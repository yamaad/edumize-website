import { Stack, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";

// map state to props
const mapStateToProps = () => ({});

// map dispatch to props
const mapDispatchToProps = {};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;

//--------------
// interfaces
//--------------
interface Accommodation extends PropsFromRedux {}
//---------------
// component
//---------------
const Accommodation = ({}: Accommodation) => {
  //---------------
  // local state
  //---------------

  return (
    <Stack>
      <Typography variant="h4" color={"content.500"}>
        Accommodation
      </Typography>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ borderRadius: 5, height: 200, background: "radial-gradient(circle, transparent 0%, rgba(32,79,88,0.4) 100%) " }}
      >
        <Typography variant="h1" color={"primary.900"}>
          Coming Soon!
        </Typography>
      </Stack>
    </Stack>
  );
};

export { Accommodation };
export default connector(Accommodation);

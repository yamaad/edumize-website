import { Box, Typography } from "@mui/material";

const ComingSoonOverlay = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
        color: "#fff",
      }}
    >
      <Typography variant="h3">Coming Soon</Typography>
    </Box>
  );
};

export default ComingSoonOverlay;

import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ComingSoonOverlay = () => {
  const { t } = useTranslation();

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ borderRadius: 5, height: 200, background: "radial-gradient(circle, transparent 0%, rgba(32,79,88,0.4) 100%) " }}
    >
      <Typography variant="h2" color={"primary.900"} textAlign={"center"}>
        {t("Coming Soon")}!
      </Typography>
    </Stack>
  );
};

export default ComingSoonOverlay;

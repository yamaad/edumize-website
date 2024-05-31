import { ThemeOptions, createTheme } from "@mui/material";

const { typography: muiTypography } = createTheme();
declare module "@mui/material/styles" {
  interface TypographyVariants {
    bodyBold: React.CSSProperties;
    bodySemibold: React.CSSProperties;
    bodyLight: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    bodyBold?: React.CSSProperties;
    bodySemibold?: React.CSSProperties;
    bodyLight?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodyBold: true;
    bodySemibold: true;
    bodyLight: true;
  }
}

const typography: Partial<ThemeOptions["typography"]> = {
  fontFamily: "Segoe UI",
  h5: {
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: 1.425,
  },
  h6: {
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: 1.225,
  },
  bodyBold: {
    ...muiTypography.body1,
    fontWeight: 700,
    fontSize: "0.875rem",
  },
  bodySemibold: {
    ...muiTypography.body1,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  bodyLight: {
    ...muiTypography.body2,
    fontWeight: 300,
    fontSize: "0.875rem",
  },
};
export default typography;

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
  h1: {
    fontWeight: 700,
    fontSize: "3.5rem",
  },
  h2: {
    fontWeight: 700,
    fontSize: "3rem",
  },
  h3: {
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  h4: {
    fontWeight: 700,
    fontSize: "2rem",
  },
  h5: {
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  h6: {
    fontWeight: 700,
    fontSize: "1.125rem",
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

import { ThemeOptions, createTheme } from "@mui/material";

const { typography: muiTypography } = createTheme();
declare module "@mui/material/styles" {
  interface TypographyVariants {
    bodyBold: React.CSSProperties;
    bodySemibold: React.CSSProperties;
    bodyNormal: React.CSSProperties;
    bodyLight: React.CSSProperties;
    bodyBoldXS: React.CSSProperties;
    bodySemiboldXS: React.CSSProperties;
    bodyNormalXS: React.CSSProperties;
    bodyLightXS: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    bodyBold?: React.CSSProperties;
    bodySemibold?: React.CSSProperties;
    bodyNormal?: React.CSSProperties;
    bodyLight?: React.CSSProperties;
    bodyBoldXS?: React.CSSProperties;
    bodySemiboldXS?: React.CSSProperties;
    bodyNormalXS?: React.CSSProperties;
    bodyLightXS?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodyBold: true;
    bodySemibold: true;
    bodyNormal: true;
    bodyLight: true;
    bodyBoldXS: true;
    bodySemiboldXS: true;
    bodyNormalXS: true;
    bodyLightXS: true;
  }
}

const typography: Partial<ThemeOptions["typography"]> = {
  fontFamily: "Poppins, Arial, sans-serif",
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
    fontSize: "1rem",
  },
  bodySemibold: {
    ...muiTypography.body1,
    fontWeight: 600,
    fontSize: "1rem",
  },
  bodyNormal: {
    ...muiTypography.body1,
    fontWeight: 400,
    fontSize: "1rem",
  },
  bodyLight: {
    ...muiTypography.body1,
    fontWeight: 300,
    fontSize: "1rem",
  },
  bodyBoldXS: {
    ...muiTypography.body1,
    fontWeight: 700,
    fontSize: "0.8rem",
  },
  bodySemiboldXS: {
    ...muiTypography.body1,
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  bodyNormalXS: {
    ...muiTypography.body1,
    fontWeight: 400,
    fontSize: "0.8rem",
  },
  bodyLightXS: {
    ...muiTypography.body1,
    fontWeight: 300,
    fontSize: "0.8rem",
  },
};
export default typography;

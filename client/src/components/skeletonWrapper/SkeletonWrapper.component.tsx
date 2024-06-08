import { Skeleton, SkeletonProps } from "@mui/material";
import { ReactNode } from "react";

interface SkeletonWrapperProps extends SkeletonProps {
  children: ReactNode;
  condition: any | undefined;
}

const SkeletonWrapper = ({ children, condition, ...rest }: SkeletonWrapperProps) => {
  if (!condition) return <Skeleton {...rest}>{children}</Skeleton>;
  return <>{children}</>;
};

export { SkeletonWrapper };

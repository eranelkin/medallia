// import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const BaseTypography = ({ className, children }) => (
  <Typography className={className} variant="body1" component="div">
    {children}
  </Typography>
);

export const StyledTypography = styled(BaseTypography)`
  font-weight: ${(props) => (props.isRead ? 400 : "bolder")};
`;

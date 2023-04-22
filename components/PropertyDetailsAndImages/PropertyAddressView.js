import React, { memo, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { EditRoadRounded, EditRounded } from "@mui/icons-material";
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  border: "1px solid #000",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#fff000",
  },
}));

const StyledAlertBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f4f5f7",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const DisplayName = styled(Typography)(({ theme }) => ({
   
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#000",
  textAlign: "center",
}));
   

const DisplayAddress = ({
  address,
  poBoxNumber,
  alertMissingField,
  editAddress,
  userWantsToEdit,
}) => {
  const display = (
    <>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
        }}
      >
        {address}
      </Typography>
      {poBoxNumber && (
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
          }}
        >
          {poBoxNumber}
        </Typography>
      )}
    </>
  );
  if (alertMissingField) {
    return <StyledAlertBox onClick={editAddress}>{display}</StyledAlertBox>;
  }
  return display;
};

const PropertyAddressView = ({
  name,
  street,
  city,
  state,
  country,
  poBoxNumber,
  zip,
  editName,
  editAddress,
}) => {
  const adddress = useMemo(() => {
    const addressArr = [street, city, state, country, zip];
    const addressArrFiltered = addressArr.filter(Boolean);
    const isAddressValid = addressArrFiltered.length === addressArr.length;
    return {
      displayAdress: addressArr.join(", "),
      values: { street, city, state, country, zip },
      valid: isAddressValid,
    };
  }, [street, city, state, country, zip]);
  const requirePoBox = false;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        mr: "5%",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexBasis: "33%",
        }}
      >
        <DisplayName>{name}</DisplayName>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <DisplayAddress
          address={adddress.displayAdress}
          poBoxNumber={poBoxNumber}
          alertMissingField={adddress.valid || requirePoBox}
          editAddress={editAddress}
        />
      </Box>
    </Box>
  );
};

export default PropertyAddressView;

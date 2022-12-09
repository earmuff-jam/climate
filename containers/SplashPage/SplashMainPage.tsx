import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { accordionClasses, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const options = [
  { value: "24", display: "24 hours", helperText: "24 hours" },
  { value: "7", display: "7 days", helperText: "7 days" },
  { value: "60", display: "60 minutes", helperText: "60 minutes" },
  { value: "30", display: "30 minutes", helperText: "30 minutes" },
];

const SplashMainPage = () => {
  const [value, setValue] = useState<any>({
    value: "24",
    display: "24 hours",
    helperText: "24 hours",
  });

  const handleChange = (e: any) => {
    const newVal = options.find((x) => x.value === e.target.value);
    setValue({
      display: newVal?.display,
      value: newVal?.value,
      helperText: newVal?.helperText,
    });
  };

  return (
    <>
      <Typography> Climate </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Select
            size="small"
            value={value.value}
            onChange={(e) => handleChange(e)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {options.map((v) => (
              <MenuItem value={v.value}>{v.display}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Climate Status for the past {value.helperText}
          </FormHelperText>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "row" }}>
          {[1, 2, 3].map((x) => {
            return (
              <>
                <Box
                  sx={{
                    minWidth: "24vh",
                    minHeight: "24vh",
                    backgroundColor: "lightgrey",
                  }}
                ></Box>
                hi
              </>
            );
          })}
        </Box>
      </FormControl>
    </>
  );
};

export default SplashMainPage;

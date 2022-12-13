import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Divider, Select, Typography } from "@mui/material";
import CategoryBoxList from "../../components/Home/CategoryBoxList";

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
      <Typography variant="h2" textAlign="left">
        {" "}
        Climate{" "}
      </Typography>
      <FormControl sx={{ m: 1 }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", paddingBottom: "1vh" }}
        >
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
        <CategoryBoxList />
      </FormControl>
    </>
  );
};

export default SplashMainPage;

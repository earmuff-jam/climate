import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Divider, Select,Typography } from "@mui/material";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";

const options = [
  { value: "24", display: "24 hours", helperText: "24 hours" },
  { value: "7", display: "7 days", helperText: "7 days" },
  { value: "60", display: "60 minutes", helperText: "60 minutes" },
  { value: "30", display: "30 minutes", helperText: "30 minutes" },
];

const storageLocations = [
  {
    id: "1",
    title: "Kitchen",
    icon: 'KitchenRoundedIcon',
    iconProps: {
      width: 150,
      height: 150,
    },
    desc: "Expired Items",
    expiredItemsCount: 12,
  },
  {
    id: "2",
    title: "Garage",
    icon: 'KitchenRoundedIcon',
    iconProps: {
      width: 150,
      height: 150,
    },
    desc: "Perishable Items",
    expiredItemsCount: 2,
  },
  {
    id: "1",
    title: "Storage",
    icon: 'KitchenRoundedIcon',
    iconProps: {
      width: 150,
      height: 150,
    },
    desc: "Unopened Items",
    expiredItemsCount: 22,
  },
  {
    id: "1",
    title: "Mess Drawer",
    icon: 'KitchenRoundedIcon',
    iconProps: {
      width: 150,
      height: 150,
    },
    desc: "Untouched Items",
    expiredItemsCount: 6,
  },
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "row",
            margin: "1vh 0vh",
            gap: "2vh",
          }}
        >
          {storageLocations.map((x) => {
            return (
              <>
                <Box
                  sx={{
                    minWidth: "24vh",
                    minHeight: "24vh",
                    borderRadius: "1vh",
                    padding: "2vh",
                    backgroundColor: "#F0F0F0",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    <KitchenRoundedIcon /> {x.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight="1.6">
                    {" "}
                    <strong>{x.desc}</strong>
                  </Typography>

                  <Typography variant="h5" gutterBottom lineHeight="1.6">
                    {x.expiredItemsCount}
                  </Typography>
                </Box>
              </>
            );
          })}
        </Box>
      </FormControl>
    </>
  );
};

export default SplashMainPage;

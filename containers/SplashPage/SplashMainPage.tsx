import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Select, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

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
    <Box>
      <Typography variant="h4" textAlign="left">
        Climate
      </Typography>
      <Typography variant="body2" textAlign="left">
        With global impact on over nine different countries, we plan to support our clients item management and resources.
      </Typography>
      <br />
      <Typography variant="body2" textAlign="left">
        You can also set <strong> cyclic inventories </strong> and <strong>annual inventories*</strong>
      </Typography>
      <br />
      <Typography variant="body2" textAlign="left">
        To meet our goal of reaching to every parts of the world, we have rigorously worked on design, development and user feedback for Climate.
      </Typography>
      <br/>
      <Typography variant="body2" textAlign="left">
        A commitment that we are building a better environment for all of your items. 
      </Typography>
    </Box>
  );
};

export default SplashMainPage;


// <>
// <Typography variant="h4" textAlign="left">
//   {" "}
//   Climate{" "}
// </Typography>
// <Typography variant="body2" textAlign="left">
//   {" "}
//   An idea presented
//   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum obcaecati suscipit recusandae, veritatis, magnam dolorum, repellat voluptatibus itaque sint enim tempora ad sit quibusdam?
//   <br />
//   Molestiae quas culpa corrupti expedita ratione. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut nostrum, cum aliquam repellendus saepe provident voluptatibus? Sit fugit quis quod, dolorem itaque neque nemo ex molestiae porro dolore nostrum quaerat!
// </Typography>
// {/* <FormControl sx={{ m: 1 }}>
//   <Box
//     sx={{ display: "flex", flexDirection: "row", paddingBottom: "1vh" }}
//   >
//     <Select
//       size="small"
//       value={value.value}
//       onChange={(e) => handleChange(e)}
//       displayEmpty
//       inputProps={{ "aria-label": "Without label" }}
//     >
//       {options.map((v) => (
//         <MenuItem value={v.value}>{v.display}</MenuItem>
//       ))}
//     </Select>
//     <FormHelperText>
//       Climate Status for the past {value.helperText}
//     </FormHelperText>
//   </Box>
// </FormControl> */}
// </>
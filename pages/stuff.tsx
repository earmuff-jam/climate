import { Box } from "@mui/material";
import DataTable from "../components/DataTable/DataTable";

const Stuff = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "yellow",
        padding: '1rem'
      }}
    >
      <DataTable 
      />
    </Box>
  );
};
export default Stuff;

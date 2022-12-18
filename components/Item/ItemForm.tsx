import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

interface Iprops {

}

const ItemForm = (props: Iprops) => {

    const [pogress, setProgress] = useState(0); // should be whatever the user set it to be

    const handleProgress = (val: number): void => setProgress(val);

    return (
        <Box>
            <LinearProgress
                variant="determinate"
                value={20}
                color={"secondary"}

            />
        </Box>
    )

};

export default ItemForm;
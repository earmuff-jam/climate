import React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface Iprops {
    error: boolean;
    label: string;
    value: string;
    handleEmail: Function;
    helperText: string;
}

const SingleTextField: React.FC<Iprops> = (props) => {
    
    const { error,
        label,
        value,
        handleEmail,
        helperText,
    } = props;
    
    return (
        <FormControl fullWidth error={error} variant="standard">
            <InputLabel htmlFor="component-helper">{label}</InputLabel>
            <Input
                id="component-helper"
                value={value}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        ev.preventDefault();
                    }
                    // ev.target.value -> results an error atm
                    // although i could ev.target.value in dev console
                    // this prevents onKeyDown to submit. accessibility issue ?
                }}
                onChange={(e) => {
                    if (e.target.value != " ") {
                        handleEmail(e.target.value);
                    }
                }}
                aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text">
                {helperText}
            </FormHelperText>
        </FormControl>
    )
};

export default SingleTextField;
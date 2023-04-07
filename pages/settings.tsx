import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "100%",
        marginTop: "0.2rem",
    },
    formControl: {
        width: "100%",
    },
}));

const InputField = ({ label, name, type = "text", value, onChange }: any) => (
    <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
    />
);

const Settings = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "555-555-5555",
        property: "123 Main St",
        notes: "",
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(formData);
        // TODO: Submit form data to server
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h2" gutterBottom>
                Settings
            </Typography>
            <Box component='form' onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    width: "100%",
                    marginTop: "0.2rem",
                }}
            >
                <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <FormControl className={classes.formControl}>
                    <Select
                        required
                        labelId="property-label"
                        id="property"
                        name="property"
                        value={formData.property}
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value="123 Main St">123 Main St</MenuItem>
                        <MenuItem value="456 Elm St">456 Elm St</MenuItem>
                        <MenuItem value="789 Oak St">789 Oak St</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Notes"
                    name="notes"
                    multiline
                    rows={4}
                    maxRows={6}
                    value={formData.notes}
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                    Save Changes
                </Button>
            </Box>
        </div>
    );
};

export default Settings;

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
} from "@mui/material";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    formControl: {
        width: "100%",
        marginTop: 20,
    },
});

const Settings = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "555-555-5555",
        property: "123 Main St",
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: "100%" }}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="property-label">Property</InputLabel>
                    <Select
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
                <Button variant="contained" color="primary" type="submit">
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default Settings;

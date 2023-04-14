import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAddProperty } from "./Hooks";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  paper: {
    padding: "2rem",
    textAlign: "center",
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const AddProperty = (props) => {
  const classes = useStyles();
  const { setEditMode } = props;
  const { formData, handleInputChange, handleSubmit, resetData } =
    useAddProperty();

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 500, textAlign: "center" }}>
          Add Property{" "}
        </Typography>
        <Box
          component="form"
          onSubmit={() => {
            handleSubmit();
            setEditMode(false);
          }}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name.value}
                error={formData.name.errorMsg.length ?? false}
                helperText={formData.name.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address.value}
                error={formData.address.errorMsg.length ?? false}
                helperText={formData.address.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city.value}
                error={formData.city.errorMsg.length ?? false}
                helperText={formData.city.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state.value}
                error={formData.state.errorMsg.length ?? false}
                helperText={formData.state.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode.value}
                error={formData.zipCode.errorMsg.length ?? false}
                helperText={formData.zipCode.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Rent"
                name="rent"
                type="number"
                value={formData.rent.value}
                error={formData.rent.errorMsg.length ?? false}
                helperText={formData.rent.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Square Foot"
                name="sqft"
                type="number"
                value={formData.sqft.value}
                error={formData.sqft.errorMsg.length ?? false}
                helperText={formData.sqft.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Year built"
                name="yearbuilt"
                type="number"
                value={formData.yearbuilt.value}
                error={formData.yearbuilt.errorMsg.length ?? false}
                helperText={formData.yearbuilt.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Garage"
                name="garage"
                type="number"
                value={formData.garage.value}
                error={formData.garage.errorMsg.length ?? false}
                helperText={formData.garage.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Image of Property"
                name="image"
                type="string"
                value={formData.image.value}
                error={formData.image.errorMsg.length ?? false}
                helperText={formData.image.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms.value}
                error={formData.bedrooms.errorMsg.length ?? false}
                helperText={formData.bedrooms.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms.value}
                error={formData.bathrooms.errorMsg.length ?? false}
                helperText={formData.bathrooms.errorMsg}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, display: "flex" }}
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddProperty;
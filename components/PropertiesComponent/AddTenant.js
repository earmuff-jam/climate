import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircleRounded,
  AddCircleRounded,
  EmailRounded,
  DateRange,
  PhoneRounded,
  WorkRounded,
  MonetizationOnRounded,
  PetsRounded,
  DateRangeRounded,
} from "@mui/icons-material";

import { useAddTenant } from "./Hooks";

const AddTenant = ({ setEditTenant }) => {
  const { formValues, handleSubmit, handleChange } =
    useAddTenant(setEditTenant);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Add Tenant
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              type="text"
              value={formValues.firstName.value}
              error={formValues.firstName.errorMsg.length ?? false}
              helperText={formValues.firstName.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              type="text"
              value={formValues.lastName.value}
              error={formValues.lastName.errorMsg.length ?? false}
              helperText={formValues.lastName.errorMsg}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formValues.email.value}
              error={formValues.email.errorMsg.length ?? false}
              helperText={formValues.email.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="phone"
              value={formValues.phone.value}
              error={formValues.phone.errorMsg.length ?? false}
              helperText={formValues.phone.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formValues.dob.value}
              error={formValues.dob.errorMsg.length ?? false}
              helperText={formValues.dob.errorMsg}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Occupation"
              name="occupation"
              type="text"
              value={formValues.occupation.value}
              error={formValues.occupation.errorMsg.length ?? false}
              helperText={formValues.occupation.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employer"
              name="employer"
              type="text"
              value={formValues.employer.value}
              error={formValues.employer.errorMsg.length ?? false}
              helperText={formValues.employer.errorMsg}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Monthly Income"
              name="monthlyIncome"
              type="text"
              value={formValues.monthlyIncome.value}
              error={formValues.monthlyIncome.errorMsg.length ?? false}
              helperText={formValues.monthlyIncome.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Rent Amount"
              name="rentAmount"
              type="text"
              value={formValues.rentAmount.value}
              error={formValues.rentAmount.errorMsg.length ?? false}
              helperText={formValues.rentAmount.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Emergency Contact Name"
              name="emergencyContactName"
              type="text"
              value={formValues.emergencyContactName.value}
              error={formValues.emergencyContactName.errorMsg.length ?? false}
              helperText={formValues.emergencyContactName.errorMsg}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Emergency Contact Phone"
              name="emergencyContactPhone"
              type="text"
              value={formValues.emergencyContactPhone.value}
              error={formValues.emergencyContactPhone.errorMsg.length ?? false}
              helperText={formValues.emergencyContactPhone.errorMsg}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Move-in Date"
              name="moveInDate"
              type="date"
              value={formValues.moveInDate.value}
              error={formValues.moveInDate.errorMsg.length ?? false}
              helperText={formValues.moveInDate.errorMsg}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lease Duration (in months)"
              name="leaseDuration"
              type="text"
              value={formValues.leaseDuration.value}
              error={formValues.leaseDuration.errorMsg.length ?? false}
              helperText={formValues.leaseDuration.errorMsg}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Security Deposit Amount"
              name="securityDepositAmount"
              type="text"
              value={formValues.securityDepositAmount.value}
              error={formValues.securityDepositAmount.errorMsg.length ?? false}
              helperText={formValues.securityDepositAmount.errorMsg}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnRounded />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.petAllowed.value}
                  onChange={handleChange}
                  name="petAllowed"
                  color="secondary"
                />
              }
              helperText={formValues.petAllowed.errorMsg}
              error={formValues.petAllowed.errorMsg.length ?? false}
              label="Pets Allowed"
              type="checkbox"
            />
          </Grid>
          {formValues?.petAllowed.value && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pet Description"
                name="petDescription"
                type="text"
                value={formValues.petDescription.value}
                error={formValues.petDescription.errorMsg.length ?? false}
                helperText={formValues.petDescription.errorMsg}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PetsRounded />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.backgroundCheckConsent.value}
                  onChange={handleChange}
                  name="backgroundCheckConsent"
                  color="secondary"
                />
              }
              helperText={formValues.backgroundCheckConsent.errorMsg}
              error={formValues.backgroundCheckConsent.errorMsg.length ?? false}
              label="Consent to Background Check"
              type="checkbox"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              type="submit"
              endIcon={<AddCircleRounded />}
            >
              Tenant
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddTenant;

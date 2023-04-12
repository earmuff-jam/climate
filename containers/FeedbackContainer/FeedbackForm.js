import React from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  styled,
} from "@mui/material";
import { FEEDBACK_CATEGORIES_OPTION_LIST } from "./constants";

const FormComponentWrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const FormExperienceContentStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const SliderStyled = styled("slider")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const FeedbackForm = () => {
  const { formData, handleInputChange, resetFormData, handleSubmit } =
    useFeedbackFormProperties();

  return (
    <FormComponentWrapper onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Share your feedback
      </Typography>

      <TextField
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="subject"
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="message"
        name="message"
        label="Message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleInputChange}
        required
      />

      <FormControl required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          id="category"
          name="category"
          value={formData.category}
          labelId="category-label"
          onChange={handleInputChange}
        >
          <MenuItem value="">-- Select Category --</MenuItem>
          {FEEDBACK_CATEGORIES_OPTION_LIST.map((option) => (
            <MenuItem value={option?.name}>{option?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormExperienceContentStyled>
        <InputLabel id="rating-label" sx={{ fontWeight: "bold" }}>
          How would you rate your experience?
        </InputLabel>
        <SliderStyled>
          <Slider
            id="rating"
            name="rating"
            min={0}
            max={5}
            step={0.5}
            value={formData.rating}
            onChange={handleInputChange}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {formData.rating.toFixed(1)}
          </Typography>
        </SliderStyled>
      </FormExperienceContentStyled>

      <Button
        type="submit"
        variant="contained"
        sx={{ alignSelf: "center", width: "fit-content" }}
      >
        Submit
      </Button>
    </FormComponentWrapper>
  );
};

export default FeedbackForm;
``;

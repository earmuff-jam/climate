import { useState } from "react";

const blankFeedbackFormProperties = {
  name: "",
  email: "",
  subject: "",
  message: "",
  category: "",
  rating: 0,
};

export const FEEDBACK_CATEGORIES_OPTION_LIST = [
  {
    id: 1,
    name: "Bug Report",
    description: "there is an issue with the application",
  },
  {
    id: 2,
    name: "Feature Request",
    description: "there is a new feature that you want",
  },
  {
    id: 1,
    name: "BGeneral Feedback",
    description: "there is an issue with the way things are",
  },
];

export const useFeedbackFormProperties = () => {
  const [formData, setFormData] = useState(blankFeedbackFormProperties);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({ ...blankFeedbackFormProperties });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Feedback form submission failed.");
      }
      alert("Thank you for your feedback!");
      resetFormData();
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later.");
      return;
    }
  };

  return {
    formData,
    handleInputChange,
    resetFormData,
    handleSubmit,
  };
};

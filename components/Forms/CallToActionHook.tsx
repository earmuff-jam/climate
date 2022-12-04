import { useState } from "react";

/**
 * handles emailSubscriptionform only
 * @returns [email, data, handleEmail, emailLabel, handleSubmit, error]
 */
export const useEmailForm = (): [
  string,
  string,
  (emailValue: string) => void,
  string,
  (e: React.MouseEvent) => void,
  boolean
] => {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailLabel, setEmailLabel] = useState<string>("Email Address");

  const handleEmail = (emailValue: string) => {
    setError(false);
    setData(emailValue);
    setEmailLabel(emailLabel);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (emailReg.test(data)) {
      setEmail(data);
      setData("");
      return;
    }
    setError(true);
    setEmail("");
  };

  return [email, data, handleEmail, emailLabel, handleSubmit, error];
};

/**
 * handles radio button form for request features
 * the top level rating here is 5
 * @returns [ratingValue, handleChange]
 */
export const useRatingButtonsForm = (): [
  string,
  (rating: string) => void,
] => {
  const [ratingValue, setRatingValue] = useState("5"); // default
  const handleChange = (rating: string) => {
    setRatingValue(rating);
  };

  return [ratingValue, handleChange];
}

/**
 *  handles the request feature form 
 * @returns [featureDesc, setFeatureDesc, emailDesc, setEmailDesc, rating, setRating, error, handleError, openSnackbar, handleSnackbar]
 */
export const useRequestFeatureForm = (): [
  string,
  (val: string) => void,
  string,
  (val: string) => void,
  string,
  (val: string) => void,
  boolean,
  (val: boolean) => void,
  boolean,
  (val: boolean) => void,
] => {
  const [featureDesc, setFeatureDesc] = useState<string>("");
  const [emailDesc, setEmailDesc] = useState<string>("");
  const [rating, setRating] = useState<string>("5");
  const [error, setError] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleError = (val: boolean) => setError(val);
  const handleSnackbar = (val: boolean) => setOpenSnackbar(val);

  return [
    featureDesc,
    setFeatureDesc,
    emailDesc,
    setEmailDesc,
    rating,
    setRating,
    error,
    handleError,
    openSnackbar,
    handleSnackbar
  ];

};

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
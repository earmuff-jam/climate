import { useState } from "react";
import { useRouter } from "next/router";

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
 * handles ability to add suggestions
 * @returns [email, data, handleEmail, emailLabel, handleSubmit, error]
 */
export const useAddFeatureForm = (): [
  string,
  string,
  boolean,
  boolean,
  (subjectValue: string) => void,
  (e: React.MouseEvent) => void,
  (e: React.MouseEvent) => void,
  (e: React.MouseEvent) => void,
] => {
  const router = useRouter();

  const [data, setData] = useState<string>("");
  const [opensnackbar, setopensnackbar] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");

  const handleSubject = (subjectValue: string) => {
    setError(false);
    setData(subjectValue);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (data.length > 10) {
      setSubject(data);
      setData('');
      setError(false);
      setopensnackbar(true);
      return;
    }
    setError(true);
    setSubject('');
  };

  const handleCancel = () => {
    setSubject("");
    setError(false);
    router.push("/");
  }

  const closesnackbar = () => {
    setopensnackbar(false);
  }

  return [subject, data, error, opensnackbar, handleSubject, handleSubmit, handleCancel, closesnackbar];
};

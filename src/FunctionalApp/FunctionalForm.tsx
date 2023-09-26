import { ErrorMessage } from "../ErrorMessage";
import { useState, FormEvent } from "react";
import { PhoneInput, PhoneInputState } from "./FunctionalPhoneInput";
import FunctionalTextInput from "./FunctionalTextInput";
import { allCities } from "../utils/all-cities";
import {
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isCityValid,
  isPhoneValid,
} from "../utils/validations";
import { UserInformation } from "../types";

type SubmitHandler = (formData: UserInformation | null) => void;

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ onSubmit }: { onSubmit: SubmitHandler }) => {
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      isFirstNameValid(firstNameInput) &&
      isLastNameValid(lastNameInput) &&
      isEmailValid(emailInput) &&
      isCityValid(cityInput) &&
      isPhoneValid(phoneInput)
    ) {
      const formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInput,
      };

      reset();
      onSubmit(formData);
    } else {
      alert("Bad Inputs");
      onSubmit(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        inputProps={{
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
          value: firstNameInput,
          placeholder: "Bilbo",
        }}
        labelText={"First Name"}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={isSubmitted && !isFirstNameValid(firstNameInput)}
      />

      {/* last name input */}
      <FunctionalTextInput
        inputProps={{
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
          value: lastNameInput,
          placeholder: "Baggins",
        }}
        labelText={"Last Name"}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={isSubmitted && !isLastNameValid(lastNameInput)}
      />

      {/* Email Input */}
      <FunctionalTextInput
        inputProps={{
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
          value: emailInput,
          placeholder: "bilbo-baggins@adventurehobbits.net",
        }}
        labelText={"Email"}
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={isSubmitted && !isEmailValid(emailInput)}
      />

      {/* City Input */}
      <FunctionalTextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: "Hobbiton",
          autoComplete: "On",
          list: "cities",
        }}
        labelText={"City"}
      />
      <datalist id="cities">
        {allCities.map((city) => {
          return <option value={city} />;
        })}
      </datalist>

      <ErrorMessage
        message={cityErrorMessage}
        show={isSubmitted && !isCityValid(cityInput)}
      />

      <PhoneInput
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
      />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isSubmitted && !isPhoneValid(phoneInput)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

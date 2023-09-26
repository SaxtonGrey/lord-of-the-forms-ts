import { Component, FormEvent } from "react";
import { ErrorMessage } from "../ErrorMessage";
import ClassPhoneInput from "./ClassPhoneInput";
import ClassTextInput from "../ClassApp/ClassTextInput";
import { allCities } from "../utils/all-cities";
import {
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isCityValid,
  isPhoneValid,
} from "../utils/validations";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type SubmitHandler = (formData: UserInformation | null) => void;

type ClassUserInformation = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: string[];
  isSubmitted: boolean;
};

export class ClassForm extends Component<
  { onSubmit: SubmitHandler },
  ClassUserInformation
> {
  state = {
    phoneInput: ["", "", "", ""],
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    isSubmitted: false,
  };

  reset = () => {
    this.setState({
      phoneInput: ["", "", "", ""],
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      isSubmitted: false,
    });
  };

  handlePhoneInputChange = (newPhoneInputState: string[]) => {
    this.setState({ phoneInput: newPhoneInputState });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });

    const { firstNameInput, lastNameInput, emailInput, cityInput, phoneInput } =
      this.state;

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

      this.reset();
      this.props.onSubmit(formData);
    } else {
      alert("Bad Inputs");
      this.props.onSubmit(null);
    }
  };

  render() {
    const {
      phoneInput,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      isSubmitted,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
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
        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
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
        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
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
        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
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
            return <option value={city} key={city} />;
          })}
        </datalist>

        <ErrorMessage
          message={cityErrorMessage}
          show={isSubmitted && !isCityValid(cityInput)}
        />

        <ClassPhoneInput
          phoneInputState={phoneInput}
          setPhoneInputState={this.handlePhoneInputChange}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={isSubmitted && !isPhoneValid(phoneInput)}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

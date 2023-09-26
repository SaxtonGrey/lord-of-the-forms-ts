import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstNameValid(firstName: string) {
  return firstName.length > 1 && !/\d/.test(firstName);
}

export function isLastNameValid(lastName: string) {
  return lastName.length >= 2 && !/\d/.test(lastName);
}

export function isCityValid(city: string) {
  return allCities.includes(city);
}

export function isPhoneValid(phoneNumber: string[]) {
  return phoneNumber.join("").length === 7;
}

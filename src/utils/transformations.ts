export const capitalize = (str: string) => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber: string) => {
  if (typeof phoneNumber !== "string" || phoneNumber.length === 0) {
    return phoneNumber;
  }
  return phoneNumber.replace(/(\d{2})(?=\d{2}(\d{2}(\d{1})?)?$)/g, "$1-");
};

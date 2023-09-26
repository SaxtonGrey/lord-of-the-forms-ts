import { useState } from "react";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);

  const handleFormSubmit = (formData: UserInformation | null) => {
    setUserData(formData);
  };
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm onSubmit={handleFormSubmit} />
    </>
  );
};

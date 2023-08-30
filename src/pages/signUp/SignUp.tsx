import React from "react";
import { UserLayout } from "../../layouts";
import { SignUpForm } from "./SignUpForm";

export const SignUpPage: React.FC = () => {
  return (
    <UserLayout>
      <SignUpForm />
    </UserLayout>
  );
};
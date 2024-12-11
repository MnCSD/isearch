import { InputLabel } from "@/components/input-label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { CountrySelect } from "./country-select";
import { Separator } from "@/components/ui/separator";

interface SignUpFormProps {
  name: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const SignUpForm = (
  {
    name,
    lastName,
    country,
    email,
    password,
    confirmPassword,
    setName,
    setLastName,
    setCountry,
    setEmail,
    setPassword,
    setConfirmPassword,
  } : SignUpFormProps
) => {


  return (
    <div className="w-[85%] relatives px-10">


      <div className="flex items-center gap-x-4 w-full">
        <InputLabel label="Name" value={name} setValue={setName} />
        <InputLabel label="Last Name" value={lastName} setValue={setLastName} />
      </div>

      <div className="w-full mt-4">
        <CountrySelect
          country={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <Separator
        className="mt-8 w-full bg-[#6E6E73]"
        orientation="horizontal"
      />

      <div className="w-full mt-8">
        <InputLabel
          label="name@example.com"
          value={email}
          setValue={setEmail}
        />

        <div className="mt-6 text-start">
          <span className="text-white text-start">
            This will be your new Apple Account.
          </span>

          <div className="flex flex-col gap-y-4 mt-3">
            <InputLabel
              label="Password"
              value={password}
              setValue={setPassword}
            />
            <InputLabel
              label="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

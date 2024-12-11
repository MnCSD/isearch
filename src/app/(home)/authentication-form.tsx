"use client";

import React, { useState } from "react";
import Icloud from "../icons/icloud";
import { IoIosArrowDropright } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppleIcon } from "lucide-react";
import { IoLogoApple } from "react-icons/io5";
import { SignUpForm } from "./sign-up-form";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCreatePreference } from "@/features/preferences/use-create-preferences";

export const AuthenticationForm = () => {
  const { signIn } = useAuthActions();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("GRC");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [signUpError, SetSignUpError] = useState("");
  const {mutate} = useCreatePreference()

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value, password);
    setPending(true);
    signIn("password", {email:value, password, flow: "signIn" }).then((data) => {
      console.log(data)
    }).catch(() => {
      setError("Invalid email or password");
    }).finally(() => setPending(false));
  }

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(passwordSignUp !== confirmPassword) {
      SetSignUpError("Passwords do not match");
      return
    }
    setPending(true);
    signIn("password", {name, lastName, country, email, password: passwordSignUp, flow: "signUp" }).then((data) => {
      console.log(data)
    }).catch(() => {
      SetSignUpError("Invalid email or password");
    }).finally(() => setPending(false));
  }

  return (
    <div className="max-w-screen-md md:w-[60%] w-[90%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]">
      <div className="w-full bg-navbar flex flex-col items-center justify-center rounded-[2rem] shadow-2xl py-10">
        <div className="flex flex-col items-center gap-y-6 w-full">
          <Icloud />
          <h3 className="text-[32px] text-white font-semibold text-center">
            Sign in with Apple Account
          </h3>

          <form onSubmit={onPasswordSignIn} className="relative md:w-[65%] w-[90%]  rounded-xl  h-[55px] flex items-center group">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={cn(
                "peer absolute pl-[11px] pt-4 w-full h-full rounded-xl bg-[#252527]/50 text-white focus:border-2 focus:border-[#0071E3] outline-none border-[#6E6E73] border z-[999]",
                clicked && "rounded-b-none",
                !!error && "bg-[#330000] border-[#FF3037]"
              )}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                " peer/pass absolute  top-[54px]  w-full transition h-[0px] pt-0 rounded-b-xl bg-[#252527]/50 text-white focus:border-2 focus:border-[#0071E3] outline-none  z-[998] border-t-0",
                clicked && " pt-4 h-full pl-[11px] border-[#6E6E73] border",
                !!error && "bg-[#330000] border-[#FF3037]"
              )}
            />
            <label
              className={cn(
                "text-gray-300 absolute top-1/2 transform -translate-y-1/2 left-4 peer-focus:-translate-y-5 transition-all peer-focus:text-[13px] peer-focus:-translate-x-1",
                value && "text-[13px] -translate-y-5 -translate-x-1",
                !!error && value && "z-[999] text-[#FF3037]"
              )}
            >
              Email or Phone Number
            </label>

            <label
              className={cn(
                "text-gray-300 absolute -bottom-12 hidden transform -translate-y-1/2 left-4 peer-focus/pass:-translate-y-5 transition-all peer-focus/pass:text-[13px] peer-focus/pass:-translate-x-1",
                password && "text-[13px] -translate-y-5 -translate-x-1",
                clicked && "block",
                !!error && "text-[#FF3037] z-[999]"
              )}
            >
              Password
            </label>

              {clicked &&  <button
            
              className={cn(
                "absolute top-1/2 -translate-y-1/2 right-2 transition-all transform peer-focus:-translate-y-2 z-[999]",
                value && "-translate-y-2",
                clicked && "translate-y-11"
              )}
              type="submit"
            >
              <IoIosArrowDropright className="size-8 text-[#6E6E73]" />
            </button> }
           
              {!clicked && <button
              onClick={(e) => {
                e.preventDefault();
                setClicked(true);
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 right-2 transition-all transform peer-focus:-translate-y-2 z-[999]",
                value && "-translate-y-2",
                clicked && "translate-y-11"
              )}
              type="button"
            >
              <IoIosArrowDropright className="size-8 text-[#6E6E73]" />
            </button>}
            
          </form>

          <div />
          <div />
          <div />
          <div />

          <div className="flex items-center flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="keep-me-signed-in"
                className=" bg-red-500 size-4"
              />
              <label className="text-white text-[18px]">
                Keep me signed in
              </label>
            </div>

            <div className="flex items-center flex-col gap-y-2">
              <a href="#" className="text-[#0071E3] text-[14px]">
                Forgot password?
              </a>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    className="
                     text-[#0071E3] text-[14px] px-4 rounded-lg
                     transition-all
                "
                  >
                    Create Apple Account
                  </button>
                </DialogTrigger>
                <DialogContent className="flex overflow-y-scroll max-h-[550px] flex-col items-center text-center justify-center max-w-2xl w-full pt-[250px]">
                  <DialogTitle className="text-white text-2xl flex items-center flex-col gap-y-4">
                    <IoLogoApple className="size-8 text-white" />
                    Create Your Apple Account
                  </DialogTitle>
                  <DialogDescription className="text-white text-center text-[18px]">
                    One Apple Account is all you need to access all Apple
                    services.
                    <div className="text-white text-center text-[18px]">
                      Already have an Apple Account?{" "}
                      <span
                        className="
                        text-[#0071E3] cursor-pointer
                      "
                      >
                        Sign in
                      </span>
                    </div>
                  </DialogDescription>
                  <form onSubmit={onPasswordSignUp} className="w-full flex flex-col items-center">
                    <SignUpForm 
                      name={name}
                      setName={setName}
                      lastName={lastName}
                      setLastName={setLastName}
                      email={email}
                      setEmail={setEmail}
                      country={country}
                      setCountry={setCountry}
                      password={passwordSignUp}
                      setPassword={setPasswordSignUp}
                      confirmPassword={confirmPassword}
                      setConfirmPassword={setConfirmPassword}
                    />
                    <div className="sticky bottom-0 left-0 w-[100%] bg-[#424245] h-[20px] py-10 z-[999]">
                      <div className="w-full h-full flex items-center px-10 justify-between">
                        <button
                          onClick={() => {
                            setOpen(false);
                          }}
                          type="submit"
                          className="border py-[8px] text-sm  px-[60px] rounded-lg text-[#0071E3] border-[#0071E3]"
                        >
                          Cancel
                        </button>
                        <button className=" py-[8px] text-sm  px-[60px] rounded-lg text-white bg-[#0071E3]">
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

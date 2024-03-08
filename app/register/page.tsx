"use client";

import { useState } from "react";
import { GenderType, UserType } from "../type";
import Loading from "@/components/loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import SubmitBtn from "@/components/submitBtn";
import { z } from "zod";

const defaultFormData: UserType = {
  date_of_birth: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  gender: GenderType.NotSpecified,
  phone: "",
};

const defaultError = {
  date_of_birth: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone: "",
};

function RegisterPage() {
  const prefixURL = process.env.NEXT_PUBLIC_PREFIX_URL;
  const [registerData, setRegisterData] = useState<UserType>(defaultFormData);
  const [errorMessage, setErrorMassage] = useState(defaultError);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const registerSchema = z.object({
    date_of_birth: z.string().nullable(),
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().trim().min(1, "Last name is required"),
    email: z.string().email().trim().min(1, "Email is required"),
    password: z.string().trim().min(1, "Password is required"),
    phone: z.string().trim().min(1, "Phone is required"),
  });

  const registerHandle = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${prefixURL}/auth/register`,
        registerData
      );
      if (response.status === 201) {
        setErrorMassage(defaultError);
        Swal.fire({
          title: "Register Complete",
          icon: "success",
        }).then(() => {
          router.push("/login");
        });
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        Swal.fire({
          title: "Register Failed",
          text: err.response?.data.error,
          icon: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const submitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validate = registerSchema.safeParse(registerData);
    if (!validate.success) {
      for (const issue of validate.error.issues) {
        const { path, message } = issue;
        switch (path[0]) {
          case "date_of_birth":
            setErrorMassage((prev) => ({
              ...prev,
              date_of_birth: message,
            }));
            break;
          case "first_name":
            setErrorMassage((prev) => ({
              ...prev,
              first_name: message,
            }));
            break;
          case "last_name":
            setErrorMassage((prev) => ({
              ...prev,
              last_name: message,
            }));
            break;
          case "password":
            setErrorMassage((prev) => ({
              ...prev,
              password: message,
            }));
            break;
          case "email":
            setErrorMassage((prev) => ({
              ...prev,
              email: message,
            }));
            break;
          case "phone":
            setErrorMassage((prev) => ({
              ...prev,
              phone: message,
            }));
            break;
          default:
            break;
        }
      }
    } else {
      registerHandle();
    }
  };

  return (
    <main className="pt-[102px] lg:pt-[72px] grow max-w-[512px] mx-auto px-4">
      {isLoading && <Loading />}
      <div className="my-8 bg-white rounded-lg overflow-hidden">
        <div className="bg-[url('/card-head.png')] h-60 p-10 flex flex-col justify-center text-white bg-cover bg-center">
          <h1 className="text-3xl font-medium">Register</h1>
          <p className="text-sm">Register to start your sweet journey</p>
        </div>
        <div className="px-3 py-6 sm:px-10">
          <form className="text-sm" onSubmit={(e) => submitHandle(e)}>
            <div className="mb-5 flex gap-3">
              <div>
                <label htmlFor="first_name" className="text-gray-600">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                  value={registerData.first_name}
                  onChange={(e) => changeHandle(e)}
                />
                <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                  {errorMessage.first_name}
                </p>
              </div>
              <div>
                <label htmlFor="last_name" className="text-gray-600">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                  value={registerData.last_name}
                  onChange={(e) => changeHandle(e)}
                />
                <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                  {errorMessage.last_name}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="text-gray-600">
                Mobile no.
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                value={registerData.phone}
                onChange={(e) => changeHandle(e)}
              />
              <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                {errorMessage.phone}
              </p>
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="text-gray-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                value={registerData.email}
                onChange={(e) => changeHandle(e)}
              />
              <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                {errorMessage.email}
              </p>
            </div>
            <p className="text-sm text-[#f5222d] mb-5">
              Please ensure you enter valid email address. The email cannot be
              changed after registration.
            </p>
            <div className="mb-5">
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                value={registerData.password}
                onChange={(e) => changeHandle(e)}
              />
              <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                {errorMessage.password}
              </p>
            </div>
            <div className="mb-5">
              <label className="text-gray-600">Gender (optional)</label>
              <div className="flex mt-2 sm:gap-3 sm:justify-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  className="hidden"
                  value={GenderType.Male}
                  onChange={(e) => changeHandle(e)}
                />
                <label
                  htmlFor="male"
                  className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8"
                >
                  Male
                </label>
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  className="hidden"
                  value={GenderType.Female}
                  onChange={(e) => changeHandle(e)}
                />
                <label
                  htmlFor="female"
                  className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8"
                >
                  Female
                </label>
                <input
                  id="not-specified"
                  name="gender"
                  type="radio"
                  className="hidden"
                  value={GenderType.NotSpecified}
                  onChange={(e) => changeHandle(e)}
                />
                <label
                  htmlFor="not-specified"
                  className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8"
                >
                  Not Specified
                </label>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="date_of_birth" className="text-gray-600">
                Your birthday present is waiting
              </label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full"
                value={registerData.date_of_birth || ""}
                onChange={(e) => changeHandle(e)}
              />
              <p className="text-[#e21c23] me-auto hover:cursor-pointer w-fit p-1 text-xs">
                {errorMessage.date_of_birth}
              </p>
            </div>
            <div className="mb-3 flex items-start">
              <input
                id="terms_and_condition"
                name="terms_and_condition"
                type="checkbox"
                className="me-2 mt-1"
                required
              />
              <label htmlFor="terms_and_condition" className="text-gray-600">
                I have read and accepted the
                <span className="text-[#f5222d] hover:cursor-pointer">
                  {" "}
                  terms & conditions{" "}
                </span>
                and{" "}
                <span className="text-[#f5222d] hover:cursor-pointer">
                  {" "}
                  privacy policy{" "}
                </span>
                of Swensen&apos;s.
              </label>
            </div>
            <div className="mb-5 flex items-start">
              <input
                id="receive_info"
                name="receive_info"
                type="checkbox"
                className="me-2 mt-1"
              />
              <label htmlFor="receive_info" className="text-gray-600">
                I agree to receive the information including other marketing
                activities from Swensen&apos;s and
                <span className="text-[#f5222d] hover:cursor-pointer">
                  {" "}
                  affiliated companies{" "}
                </span>
                . We will keep your data confidential. Learn more about
                <span className="text-[#f5222d] hover:cursor-pointer">
                  {" "}
                  privacy policy{" "}
                </span>
                from company&apos;s website.
              </label>
            </div>
            <SubmitBtn pendingWord="Registering" notPendingWord="Register" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;

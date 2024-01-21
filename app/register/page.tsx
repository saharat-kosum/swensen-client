"use client";

import { useState } from "react";
import { UserType } from "../type";
import Loading from "@/components/loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

const defaultFormData: UserType = {
  date_of_birth: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  gender: "not-specified",
  phone: "",
};

function RegisterPage() {
  const prefixURL = process.env.NEXT_PUBLIC_PREFIX_URL;
  const [registerData, setRegisterData] = useState<UserType>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const registerHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${prefixURL}/auth/register`,
        registerData
      );
      if (response.status === 201) {
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

  return (
    <main className="pt-[102px] lg:pt-[72px] grow max-w-[512px] mx-auto px-4">
      {isLoading && <Loading />}
      <div className="my-8 bg-white rounded-lg overflow-hidden">
        <div className="bg-[url('/card-head.png')] h-60 p-10 flex flex-col justify-center text-white bg-cover bg-center">
          <h1 className="text-3xl font-medium">Register</h1>
          <p className="text-sm">Register to start your sweet journey</p>
        </div>
        <div className="px-3 py-6 sm:px-10">
          <form className="text-sm" onSubmit={(e) => registerHandle(e)}>
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
                  required
                />
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
                  required
                />
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
                required
              />
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
                required
              />
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
                required
              />
            </div>
            <div className="mb-5">
              <label className="text-gray-600">Gender (optional)</label>
              <div className="flex mt-2 sm:gap-3 sm:justify-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  className="hidden"
                  value={"male"}
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
                  value={"female"}
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
                  value={"not-specified"}
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
            <button
              type="submit"
              className="text-center w-full rounded-full h-12 bg-[#e21c23] text-white text-sm"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import axios from "axios";
import Swal from "sweetalert2";
import { loginAction } from "./action";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

function LoginPage() {
  const prefixURL = process.env.NEXT_PUBLIC_PREFIX_URL;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const loginHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${prefixURL}/auth/login`,
        loginPayload
      );
      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        Swal.fire({
          title: "Login Failed",
          text: err.response?.data.messeage || err.response?.data.error,
          icon: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginPayload((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="pt-[102px] lg:pt-[72px] grow max-w-[512px] w-full mx-auto px-4">
      {isLoading && <Loading />}
      <div className="my-8 bg-white rounded-lg overflow-hidden">
        <div className="bg-[url('/card-head.png')] h-60 p-10 flex flex-col justify-center text-white bg-cover bg-center">
          <h1 className="text-3xl font-medium">Welcome</h1>
          <p className="text-sm">Login to begin journey</p>
        </div>
        <div className="px-3 py-6 sm:px-10">
          <form
            className="text-sm"
            // onSubmit={(e) => loginHandle(e)}
            action={formAction}
          >
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
                value={loginPayload.email}
                onChange={(e) => changeHandle(e)}
                required
              />
            </div>
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
                value={loginPayload.password}
                onChange={(e) => changeHandle(e)}
                required
              />
            </div>
            <p className="text-[#e21c23] me-auto mb-5 hover:cursor-pointer w-fit">
              {state?.message}
            </p>
            <p className="text-[#e21c23] ms-auto mb-5 hover:cursor-pointer w-fit">
              Forgot password?
            </p>
            <button
              type="submit"
              className="text-center w-full rounded-full h-12 bg-[#e21c23] text-white text-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

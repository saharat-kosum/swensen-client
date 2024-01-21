function LoginPage() {
  return (
    <main className="pt-[102px] lg:pt-[72px] grow max-w-[512px] w-full mx-auto px-4">
      <div className="my-8 bg-white rounded-lg overflow-hidden">
        <div className="bg-[url('/card-head.png')] h-60 p-10 flex flex-col justify-center text-white bg-cover bg-center">
          <h1 className="text-3xl font-medium">Welcome</h1>
          <p className="text-sm">Login to begin journey</p>
        </div>
        <div className="px-3 py-6 sm:px-10">
          <form className="text-sm">
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
                required
              />
            </div>
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

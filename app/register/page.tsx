'use client'

function RegisterPage() {
  return (
    <main className="pt-[102px] lg:pt-[72px] grow max-w-[512px] mx-auto px-4">
      <div className="my-8 bg-white rounded-lg overflow-hidden">
        <div className="bg-[url('/card-head.png')] h-60 p-10 flex flex-col justify-center text-white bg-cover bg-center">
          <h1 className="text-3xl font-medium">Register</h1>
          <p className="text-sm">Register to start your sweet journey</p>
        </div>
        <div className="px-3 py-6 sm:px-10">
          <form className="text-sm">
            <div className="mb-5 flex gap-3">
              <div>
                <label htmlFor="first_name" className="text-gray-600">First Name</label>
                <input id="first_name" name="first_name" type="text" placeholder="First Name" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" required />
              </div>
              <div>
                <label htmlFor="last_name" className="text-gray-600">Last Name</label>
                <input id="last_name" name="last_name" type="text" placeholder="Last Name" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" required />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="text-gray-600">Mobile no.</label>
              <input id="phone" name="phone" type="tel" maxLength={10} placeholder="10-digit mobile number" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" required />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="text-gray-600">Email</label>
              <input  id="email" name="email" type="email" placeholder="Enter email" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" required />
            </div>
            <p className="text-sm text-[#f5222d] mb-5">Please ensure you enter valid email address. The email cannot be changed after registration.</p>
            <div className="mb-5">
              <label htmlFor="password" className="text-gray-600">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" required />
            </div>
            <div className="mb-5">
              <label className="text-gray-600">Gender (optional)</label>
              <div className="flex mt-2 sm:gap-3 sm:justify-center">
                <input id="male" name="gender" type="radio" className="hidden" value={'male'} />
                <label htmlFor="male" className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8">Male</label>
                <input id="female" name="gender" type="radio" className="hidden" value={'female'} />
                <label htmlFor="female" className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8">Female</label>
                <input id="not-specified" name="gender" type="radio" className="hidden" value={'not-specified'} />
                <label htmlFor="not-specified" className="text-[#f5222d] border-[1px] leading-tight py-2 px-4 rounded-full sm:py-3 sm:px-8">Not Specified</label>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="date_of_birth" className="text-gray-600">Your birthday present is waiting</label>
              <input id="date_of_birth" name="date_of_birth" type="date" className="border-[1px] p-3 rounded-lg outline-0 text-gray-500 mt-2 w-full" />
            </div>
            <div className="mb-3 flex items-start">
              <input id="terms_and_condition" name="terms_and_condition" type="checkbox" className="me-2 mt-1" required />
              <label htmlFor="terms_and_condition" className="text-gray-600">
                I have read and accepted the
                <span className="text-[#f5222d] hover:cursor-pointer"> terms & conditions </span>
                  and <span className="text-[#f5222d] hover:cursor-pointer"> privacy policy </span>
                  of Swensen's.
              </label>
            </div>
            <div className="mb-5 flex items-start">
              <input id="receive_info" name="receive_info" type="checkbox" className="me-2 mt-1" />
              <label htmlFor="receive_info" className="text-gray-600">
                I agree to receive the information including other marketing activities from Swensen's and 
                <span className="text-[#f5222d] hover:cursor-pointer"> affiliated companies </span>
                . We will keep your data confidential. Learn more about
                <span className="text-[#f5222d] hover:cursor-pointer">  privacy policy </span>
                from company's website.
              </label>
            </div>
            <button type="submit" className="text-center w-full rounded-full h-12 bg-[#e21c23] text-white text-sm" >Register</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
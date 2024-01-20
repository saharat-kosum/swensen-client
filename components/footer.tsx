import Image from "next/image";
import SwensenIcon from "./swensen-icon";

function Footer() {
  return (
    <section className="w-full">
      <footer className="flex p-6 bg-[#e21c23] items-center flex-col lg:flex-row gap-5">
        <SwensenIcon />
        <div className="lg:ms-auto">
          <ul className="flex font-semibold xl:text-xl text-white flex-wrap justify-center">
            <li className="mx-3 hover:cursor-pointer">
              Brandsite
            </li>
            <li className="mx-3 hover:cursor-pointer">
              Privilege
            </li>
            <li className="mx-3 hover:cursor-pointer">
              Reward
            </li>
            <li className="mx-3 hover:cursor-pointer">
              My Coupons
            </li>
            <li className="mx-3 hover:cursor-pointer">
              Gift Voucher
            </li>
            <li className="mx-3 hover:cursor-pointer">
              Member Card
            </li>
            <li className="mx-3 hover:cursor-pointer">
              My Account
            </li>
          </ul>
        </div>
      </footer>
      <footer className="flex px-6 py-4 bg-[#cb191f] items-center flex-col-reverse sm:flex-row gap-5">
        <div>
          <ul className="flex">
            <li className="mx-2 hover:cursor-pointer">
              <Image
                src="/icon-facebook.svg"
                alt="facebook Logo"
                width={24}
                height={25}
              />
            </li>
            <li className="mx-2 hover:cursor-pointer">
              <Image
                src="/icon-instagram.svg"
                alt="instagram Logo"
                width={24}
                height={25}
              />
            </li>
            <li className="mx-2 hover:cursor-pointer">
              <Image
                src="/icon-youtube.svg"
                alt="youtube Logo"
                width={24}
                height={25}
              />
            </li>
          </ul>
        </div>
        <div className="sm:ms-auto">
          <ul className="flex text-white flex-wrap justify-center">
            <li className="mx-3 hover:cursor-pointer">FAQ</li>
            <li className="mx-3 hover:cursor-pointer">Terms and Conditions</li>
            <li className="mx-3 hover:cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </footer>
    </section>
  )
}

export default Footer
import Carousel from "@/components/corousel";
import Image from "next/image";

export default function Home() {
  const slides = ['/superdeal_1.jpg', '/superdeal_2.png', '/superdeal_3.png', '/superdeal_4.jpg']
  return (
    <main className="pt-[102px] lg:pt-[72px] grow">
      <div className="xl:py-24 pt-5 pb-20 bg-gradient-to-b from-[#ff807c] to-[#fd4b47]">
        <div className="container flex w-full mx-auto max-w-[1200px] px-3.5 lg:flex-row flex-col-reverse">
          <div className="grow basis-2/4 text-white">
            <h1 className="xl:text-[54px] text-4xl font-medium leading-tight text-center lg:text-left mt-6">
              สมัครเป็นสมาชิก<br />
              สเวนเซ่นส์วันนี้พร้อมรับสิทธิพิเศษมากมายรอคุณอยู่ที่นี่
            </h1>
            <p className="mt-6 xl:text-xl text-lg text-center lg:text-left">
              พิเศษสุดๆ! สำหรับสมาชิกสเวนเซ่นส์ ยิ่งกิน ยิ่งได้
              ยิ่งคุ้ม ใครๆ ก็สมัครได้
              ใช้ง่ายสะดวกสบายพร้อมสิทธิประโยชน์มากมายเพื่อคนสำคัญเช่นคุณ รอไม่ได้แล้ว
              สมัครเลย
            </p>
            <div className="mt-12">
              <div className="w-72 h-20 bg-cover bg-center transition-all bg-[url('/EN_normal.svg')] hover:bg-[url('/EN_hover.svg')] hover:cursor-pointer" ></div>
            </div>
          </div>
          <div className="relative grow basis-2/4 min-h-52 md:min-h-80">
            <Image src={'/banner-image.svg'} alt="banner" fill priority />
          </div>
        </div>
      </div>
      <div className="bg-white py-10 px-4 ">
        <div className="container max-w-[1200px] mx-auto">
          <div>
            <h1 className="text-3xl font-semibold mb-5">Super Deal</h1>
            <Carousel slides={slides} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold my-6">News</h1>
          </div>
        </div>
      </div>
      <div className="mt-10 mx-4 ">
        <div className="container max-w-[1200px] mx-auto flex flex-col lg:flex-row-reverse justify-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-3xl font-semibold mb-6 lg:text-left">Download on</h1>
            <div className="flex gap-5 justify-center mb-8">
              <Image className="w-auto lg:min-w-[170px]" src={'/google-play.png'} alt="google-play" width={100} height={100} />
              <Image className="w-auto lg:min-w-[170px]" src={'/app-store.png'} alt="app-store" width={100} height={100} />
            </div>
          </div>
          <Image className="w-auto m-auto min-w-[260px] lg:min-w-[400px] lg:mx-0" src={'/app-screen-webp.webp'} alt="app-screen" width={100} height={100} />
        </div>
      </div>
    </main>
  );
}

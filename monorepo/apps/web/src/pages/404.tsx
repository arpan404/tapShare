import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PiHandTapFill } from "react-icons/pi";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[100vdh] w-full items-center justify-center">
      <div className="flex min-h-[100dvh] items-center justify-center py-12">
        <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
          <div className="mt-10 w-full rounded-md bg-gray-50 px-6 pb-4 pt-8">
            <div className="flex justify-center">
              <h1 className="select-none text-center text-4xl font-black text-slate-600 sm:text-4xl md:text-5xl lg:text-6xl">
                Are You Lost?
              </h1>
            </div>
            <div className="flex select-none text-justify">
              <div className="select-none  font-bold text-slate-800">
                <p className="text-md mt-5 ">
                  {" "}
                  Oops! Looks like you've encountered an infinite loop in the
                  digital jungle. Let's navigate back to civilization!
                </p>

                <p className="mt-2 text-sm font-medium">
                  404 not found, but we've got backup plans! Check out these
                  safe havens
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                <button
                  className="ease flex w-[161px] items-center justify-center gap-2 rounded-md border-2 border-blue-500 py-2 text-blue-500 transition-all duration-100 hover:bg-blue-500 hover:text-gray-50 active:bg-blue-400"
                  onClick={() => navigate(-1)}
                >
                  <MdOutlineArrowBack  className="text-xl"/>
                  Back to Safety
                </button>
                <button
                  className="ease flex px-4 items-center justify-center gap-2 rounded-md bg-blue-500 py-2 text-gray-100 transition-all duration-100 hover:bg-blue-600 hover:text-gray-50 active:bg-blue-400"
                  onClick={() => navigate("/")}
                >
                  <AiOutlineHome className="text-xl"/> Let's Keep Tapping <PiHandTapFill className="text-xl"/>
                </button>
              </div>
            </div>
            <p className="pt-4 text-end text-[10px] font-medium">
              Sorry, we can't find that page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

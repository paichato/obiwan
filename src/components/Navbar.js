// import Navbar from "./navbar";
// import Footer from "./footer";
import { IoSearchSharp } from "react-icons/io5";

export default function Navbar({ children }) {
  return (
    <>
      <header>
        <div className=" pl-5 w-full flex flex-row items-center justify-between">
          <span className="font-bold text-2xl">STAR WARS</span>

          <div className={"flex flex-row bg-slate-900 p-5 cursor-pointer "}>
            <IoSearchSharp
              className="hover:fill-cyan-700 text-5xl"
              color="#fff"
            />
          </div>
        </div>
      </header>
    </>
  );
}

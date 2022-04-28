// import Navbar from "./navbar";
// import Footer from "./footer";

import Link from "next/link";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="p-10">
      <Navbar />

      <main>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col bg-rose-900 w-2/12">
            <Link href="/" className="text-blue-600">
              <a>Personagem</a>
            </Link>
            <Link href="/" className="text-blue-600">
              <a>Planetas</a>
            </Link>
          </div>
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

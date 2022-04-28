import React from "react";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, transition: { delayChildren: 1.5 } },
  closed: { opacity: 0, display: "none" },
};

export const SearchField = ({ toggleSearching, searching }) => {
  const SearchItem = () => {
    return (
      <div className="flex items-center justify-center w-full cursor-pointer  hover:bg-zinc-800 h-16 ">
        <span className="w-6/12 ">sadas</span>
      </div>
    );
  };

  return (
    <motion.div
      variants={variants}
      animate={searching ? "open" : "close"}
      className="container flex flex-col items-center justify-center w-full h-full "
    >
      <div className="flex w-6/12 h-28 self-center  flex flex-col  justify-between mb-5  ">
        <span>Pesquisar por personagem ou planeta</span>
        <div className="w-full border-b-4">
          <input
            className="search text-3xl  font-bold h-10 text-white border-0 w-full border-transparent outline-0 "
            placeholder="Pesquisar"
          />
        </div>
      </div>
      <>
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </>
      {/* <div className="flex w-full self-end place-self-end justify-self-end h-16  left-0  absolute bottom-0 ">
        <div
          onClick={() => toggleSearching()}
          className="flex font-bold items-center justify-center w-2/12  bg-zinc-800 hover:bg-rose-800 cursor-pointer"
        >
          Voltar
        </div>
      </div> */}
    </motion.div>
  );
};

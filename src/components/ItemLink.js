import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

export const ItemLink = ({ starWarsItem, filter, list }) => {
  return !list ? (
    <Link
      href={{
        pathname: filter
          ? `/planetDetails/${starWarsItem.name}`
          : `/characterDetails/${starWarsItem.name}`,

        query: { id: starWarsItem.url.replace(/[^0-9]/g, "") },
      }}
      key={starWarsItem?.name}
    >
      <a className="bg-[#e0ddaa] bg-purple-200 rounded w-full p-10 mb-5 block flex items-center hover:transform-gpu hover:duration-200 hover:translate-x-10">
        <img src={starWarsItem?.o} alt={starWarsItem?.o}></img>
        <div className="flex-1">
          <strong className="text-xl text-zinc-700">
            {starWarsItem?.name}
          </strong>
          <p className="text-zinc-500">Ver mais detalhes</p>
        </div>
        <FiChevronRight color="#000" size={20} />
      </a>
    </Link>
  ) : (
    <Link
      href={{
        pathname: `/characterDetails/${starWarsItem.name}`,

        query: { id: starWarsItem.url.replace(/[^0-9]/g, "") },
      }}
      key={starWarsItem}
    >
      <a className="bg-[#e0ddaa] bg-purple-200 rounded w-full p-10 mb-5 block flex items-center hover:transform-gpu hover:duration-200 hover:translate-x-10">
        <img src={starWarsItem?.o} alt={starWarsItem?.o}></img>
        <div className="flex-1">
          <strong className="text-xl text-zinc-700">{starWarsItem.name}</strong>
          <p className="text-zinc-500">Ver mais detalhes</p>
        </div>
        <FiChevronRight color="#000" size={20} />
      </a>
    </Link>
  );
};

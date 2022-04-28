import React, { useEffect, useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { http } from "../../services/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AltHeader } from "../../components/AltHeader";

function CharacterDetails() {
  const router = useRouter();
  const [people, setPeople] = useState(null);
  const [planet, setPlanet] = useState([]);
  console.log("QUERY:", router.query.name);
  useEffect(() => {
    http.get(`/people/${router.query.id}`).then((response) => {
      console.log(response.data);
      setPeople(response.data);
    });
  }, [router.query]);

  useEffect(() => {
    getPlanet();
  }, [people]);

  const getPlanet = async () => {
    console.log("HOMEWORLD ID:", people?.homeworld?.replace(/[^0-9]/g, ""));
    http
      .get(`/planets/${people?.homeworld.replace(/[^0-9]/g, "")}`)
      .then((response) => {
        console.log(response.data);
        setPlanet(response.data);
      });
  };

  return (
    <div className="lg:px-40 p-5">
      <AltHeader router={router} />
      {people ? (
        <section className="mt-10  2xl:p-10 xl:p-10 md:p-10 lg:p-10 p-5  h-80  bg-slate-50 w-12/12  md:w-12/12 lg:w-8/12 rounded drop-shadow-2xl">
          <header className="flex items-center">
            <div
              className="w-0 sm:w-32 h-32 rounded bg-gradient-to-r from-sky-500 to-indigo-500"
              src={people?.owner?.avatar_url}
              alt={people?.owner?.login}
            />
            <div className="flex flex-col sm:ml-24 ">
              <strong className="text-[#3d3d4d] text-3xl">
                {people?.name}
              </strong>
              <Link
                href={{
                  pathname: `/planetDetails/${planet.name}`,
                  query: { id: planet?.url?.replace(/[^0-9]/g, "") },
                }}
              >
                <a className=" text-slate-100 mt-5 font-bold text-3xl bg-gradient-to-r from-sky-500 to-indigo-500 p-2 rounded drop-shadow-xl">
                  Planeta:{planet?.name}
                </a>
              </Link>
              <p className="text-xl text-[ #737380] mt-4">
                {people?.description}
              </p>
            </div>
          </header>
          <ul className="flex mt-20  bg-sky-100 rounded items-center justify-evenly py-10 sm:p-10  ">
            <li className="sm:p-10">
              <strong className="block xl:text-2xl text-xl text-[#3d3d4d]">
                {people?.gender}
              </strong>
              <span className="block mt-4 xl:text-2xl text-md text-[#6c6c80] ">
                Género
              </span>
            </li>

            <li className="sm:p-10">
              <strong className="block  text-[#3d3d4d] xl:text-2xl text-xl">
                {people?.skin_color}
              </strong>
              <span className="block mt-4 xl:text-2xl text-md text-[#6c6c80] ">
                Pele
              </span>
            </li>

            <li className="sm:p-10 ">
              <strong className="block xl:text-2xl text-xl text-[#3d3d4d]">
                {people?.height}
              </strong>
              <span className="block mt-4 xl:text-2xl text-md text-[#6c6c80]">
                Altura
              </span>
            </li>
          </ul>
        </section>
      ) : (
        <Image
          className="absolute animate-pulse"
          width={80}
          height={80}
          src="/loader.gif"
          alt="ad"
        />
      )}
    </div>
  );
}

export default CharacterDetails;

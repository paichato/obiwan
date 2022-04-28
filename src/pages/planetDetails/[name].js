import React, { useEffect, useState } from "react";

import { FiChevronLeft, FiRefreshCcw } from "react-icons/fi";
import { http } from "../../services/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ItemLink } from "../../components/ItemLink";
import Image from "next/image";
import { AltHeader } from "../../components/AltHeader";

function CharacterDetails() {
  const router = useRouter();
  const [planet, setPlanet] = useState(null);
  const [people, setPeople] = useState([]);
  const [errorFetch, setErrorFetch] = useState(false);
  const [noResidents, setNoResidents] = useState(false);

  console.log("QUERY:", router.query.name);
  useEffect(() => {
    http.get(`/planets/${router.query.id}`).then((response) => {
      console.log(response.data);
      setPlanet(response.data);
    });

    console.log(planet?.residents);
  }, [router.query]);

  useEffect(() => {
    if (planet) getCharacters();
  }, [planet]);

  const getCharacters = async () => {
    const newArray = [];

    if (planet.residents.length > 0) {
      planet.residents.forEach((char) => {
        try {
          http.get(`${char}`).then((response) => {
            newArray.push(response.data);
          });
        } catch (error) {
          setErrorFetch(true);
        }
      });
      setTimeout(() => {
        setPeople(newArray);
      }, 1000);
    } else {
      setNoResidents(true);
    }

    console.log("CHARS:", people);
    // console.log("HOMEWORLD ID:", planet?.homeworld?.replace(/[^0-9]/g, ""));
  };

  const ErrorFetchWrapper = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center ">
        <p className="text-zinc-400 text-xl">Erro ao carregar residentes</p>
        <button
          onClick={getCharacters}
          className="flex flex-row items-center justify-evenly text-zinc-100 font-bold bg-sky-800 w-3/12 p-5 rounded"
        >
          recarregar <FiRefreshCcw size={20} />
        </button>
      </div>
    );
  };
  const ErrorNoResidentsWrapper = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center ">
        <p className="text-zinc-400 text-xl">Planeta sem residentes</p>
      </div>
    );
  };

  return (
    <div className="2xl:px-40 xl:px-40  md:px-20 p-5 w-full">
      <AltHeader router={router} />
      {planet ? (
        <div className="flex flex-col  lg:flex-row w-full">
          <section className="mt-10  2xl:p-10 xl:p-10 md:p-10 lg:p-10 p-5  h-80  bg-slate-50 w-12/12  md:w-12/12 lg:w-8/12 rounded drop-shadow-2xl">
            <header className="flex items-center">
              <div
                className="w-32 h-32 rounded bg-gradient-to-r from-sky-500 to-indigo-500"
                src={planet?.owner?.avatar_url}
                alt={planet?.owner?.login}
              />
              <div className="flex flex-col ml-10 sm:ml-24 2x:ml-24 xl:ml-24 lg:ml-24">
                <p className=" text-slate-300 text-3xl">Planeta</p>
                <strong className="text-[#3d3d4d] text-4xl">
                  {planet?.name}
                </strong>
                <p className="text-xl text-[ #737380] mt-4">
                  {planet?.description}
                </p>
              </div>
            </header>
            <ul className="flex mt-20  bg-sky-100 rounded items-center justify-evenly py-10 sm:p-10  ">
              <li className="sm:p-10 flex flex-col items-center justify-center">
                <strong className="block text-sm sm:text-2xl text-[#3d3d4d]">
                  {planet?.gravity}
                </strong>
                <span className="block mt-4 text-[#6c6c80]">Gravidade</span>
              </li>

              <li className="sm:p-10 flex flex-col items-center justify-center">
                <strong className="block text-sm sm:text-2xl text-[#3d3d4d]">
                  {planet?.population}
                </strong>
                <span className="block mt-4 text-[#6c6c80] w-full">
                  População
                </span>
              </li>

              <li className="sm:p-10 flex flex-col items-center justify-center">
                <strong className="block text-sm  sm:text-2xl text-[#3d3d4d]">
                  {planet?.terrain}
                </strong>
                <span className="block mt-4 text-[#6c6c80]">Terreno</span>
              </li>
            </ul>
          </section>

          <div className=" lg:mt-10   mt-20 sm:mt-60 sm:ml-5 p-2 w-12/12">
            <div className="flex flex-col mb-8  w-full pl-5">
              <h3 className="text-2xl text-zinc-400 font-bold">Residents</h3>
              {/* <FiChevronDown color="gray" size={80} height={180} width={180} /> */}
            </div>
            {noResidents && <ErrorNoResidentsWrapper />}
            {errorFetch && <ErrorFetchWrapper />}
            {people?.map((resident) => {
              return <ItemLink list starWarsItem={resident} filter={false} />;
            })}
          </div>
        </div>
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

import React, { useState, useEffect } from "react";

// import logo from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
// import http from '../../services/http';
// import {Link} from 'react-router-dom';
import Link from "next/link";
import { http } from "../services/axios";
import styles from "../../styles/Dashboard.module.css";
import Loader from "../../public/loader.gif";
import Image from "next/image";
import { ItemLink } from "../components/ItemLink";

function Dashboard({ prePeople, prePlanets }) {
  const [search, setSearch] = useState("");
  const [inputError, setInputError] = useState(" ");
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState(prePeople);
  const [planets, setPlanets] = useState(prePlanets);

  const filterStyles = [
    " p-5 bg-transparent border-slate-300 text-slate-800 border-8 inner-5 rounded  drop-shadow-lg px-3",
    "p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded ",
  ];
  const [starwarsData, setStarwarsData] = useState(() => {
    const storagedStarWarsData =
      typeof window !== "undefined"
        ? localStorage.getItem("@StarWars:starwarsData")
        : prePeople;

    // if (storagedStarWarsData) {
    //   return JSON.parse(storagedStarWarsData);
    // } else {
    //   return [];
    // }
  });

  // useEffect(() => {
  //   setStarwarsData(chars);
  // }, []);

  //   useEffect(() => {
  //     if (starwarsData !== []) {
  //       localStorage.setItem(
  //         "@StarWars:starwarsData",
  //         JSON.stringify(starwarsData)
  //       );
  //     }
  //   }, [starwarsData]);

  const toggleFilter = () => {
    setInputError(" ");
    setFilter(!filter);
  };

  useEffect(() => {
    // getData();
    starwarsData === prePeople
      ? setStarwarsData(prePlanets)
      : starwarsData === prePlanets
      ? setStarwarsData(prePeople)
      : getData();
  }, [filter]);

  useEffect(() => {
    console.log(search);
    handleSearch();
  }, [search]);

  useEffect(() => {});

  const getData = async () => {
    setLoading(true);
    // setSearch("");
    if (filter) {
      const newData = await http.get("/planets");
      setStarwarsData(newData.data.results);
      setLoading(false);
    } else {
      const newData = await http.get("/people");
      setStarwarsData(newData.data.results);
      setLoading(false);
    }
    // console.log(JSON.stringify(newData.data.results));
  };

  const handleSearch = async () => {
    if (!search) return;
    setInputError(" ");
    // console.log(event);

    //  event.preventDefault();

    setLoading(true);
    if (filter) {
      try {
        const newData = await http.get(`/planets?search=${search}`);

        if (newData.data.results.length > 0) {
          setStarwarsData(newData.data);
        } else {
          setStarwarsData([]);
          setInputError("Opps! Nada foi encontrado nesta galaxia");
        }
        setLoading(false);
      } catch (error) {
        setInputError("Opps! Ocorreu algum erro com a nave");
      }
    } else {
      try {
        const newData = await http.get(`/people?search=${search}`);

        if (newData.data.results.length > 0) {
          setStarwarsData(newData.data.results);
        } else {
          setStarwarsData([]);
          setInputError("Opps! Nada foi encontrado nesta galaxia");
        }
        setLoading(false);
      } catch (error) {
        setInputError("Opps! Ocorreu algum erro com a nave");
      }
    }
  };

  async function handleStarwarsRequest(event) {
    //Add new repo
    console.log(search);
    event.preventDefault();

    if (!search) {
      setInputError("Type the author/name of the repo");
      return;
    }
    try {
      const response = await http.get(`repos/${search}`);
      console.log(response.data);
      const repository = response.data;
      setStarwarsData([...starwarsData, repository]);
      setSearch("");
      setInputError("");
    } catch (err) {
      setInputError("Error on search for repo");
    }
  }

  return (
    <div className="p-6 xl:p-40 w-full md:p-5 sm:p-5 sm:w-200">
      {/* <img src={logo} alt="Github Explorer" /> */}
      <span className="text-5xl text-slate-700 mt-80 max-w-md font-mono font-bold">
        Explore o mundo STAR WARS
      </span>

      <div
        className="flex max-w-3xl mt-32 min-w-1  "
        hasError={!!inputError}
        // onSubmit={(e) => handleSearch(e)}
        action=""
      >
        <input
          className="flex  flex-1 outline-0 h-20 py-0 xl:px-24 md:px-24 pl-5 sm:pl-5 border-0 rounded-l text-stale-900  placeholder:text-slate-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Navegue pelo mundo star wars"
        />
        <button
          onClick={handleSearch}
          className={
            "flex items-center justify-center w-40 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-r font-bold hover:bg-teal-700"
          }
          type="button"
        >
          Search
        </button>
      </div>

      <div className="flex flex-row mt-4 w-64  items-center justify-between ">
        <button
          onClick={toggleFilter}
          className={!filter ? filterStyles[0] : filterStyles[1]}
        >
          personagem
        </button>
        <button
          onClick={toggleFilter}
          className={filter ? filterStyles[0] : filterStyles[1]}
        >
          planeta
        </button>
      </div>

      {inputError && (
        <span className="block text-rose-900 mt-5">{inputError}</span>
      )}

      <div className="mt-32 sm:mt-40 m-w-md">
        {loading && (
          <Image
            className="absolute animate-pulse"
            width="80"
            height={80}
            src="/loader.gif"
            alt="ad"
          />
        )}
        {starwarsData &&
          starwarsData?.map((starWarsItem, index) => {
            return <ItemLink filter={filter} starWarsItem={starWarsItem} />;
          })}
      </div>
    </div>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  const peopleRes = await http.get("/people");
  const planetsRes = await http.get("/planets");
  return {
    prePeople: peopleRes.data.results,
    prePlanets: planetsRes.data.results,
  };
};

export default Dashboard;

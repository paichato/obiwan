import React, { useEffect } from "react";
import { SearchField } from "../components/SearchField";
import { http } from "../services/axios";

export const Search = () => {
  const getData = async () => {
    const price = await http.get("/");
    console.log(price.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return <SearchField />;
};

export default Search;

// export const getStaticProps = async () => {
//   const price = await fetch("https://swapi.dev/api/people/1");
//   const data = price.json();
//   console.log(data);
//   return {
//     props: { data },
//   };
// };

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Logo from "../../public/logo.svg";
import { IoSearchSharp } from "react-icons/io5";
import { createRef, useRef, useEffect, useState } from "react";
import Sound from "react-sound";
import { SearchField } from "../components/SearchField";

export default function Home() {
  const soundRef = createRef();
  const soundRef2 = createRef();
  const iconRef = useRef();
  const iconRef2 = useRef();
  const [searching, setSearching] = useState(false);

  const toggleSearching = () => {
    setSearching(!searching);
  };

  const handlePlaySound = (e) => {
    // soundRef.current.muted = true;
    // console.log(Sound.props);
    // handleIconShow1();
    handlePauseSound();
    soundRef.current.play();
  };
  const handlePlaySound2 = (e) => {
    // handleIconShow2();
    handlePauseSound();
    soundRef2.current.play();
  };

  const handlePauseSound = () => {
    soundRef.current.currentTime = 0;
    soundRef2.current.currentTime = 0;
  };

  // const handleIconShow1 = () => {
  //   if (iconRef.current.className === "absolute -z-10 right-0 ml-5 hidden") {
  //     iconRef.current.className =
  //       "absolute -z-10 block right-0 ml-5  animate-pulse";
  //   }
  // };
  // const handleIconHide1 = () => {
  //   if (
  //     iconRef.current.className ===
  //     "absolute -z-10 block right-0 ml-5  animate-pulse"
  //   ) {
  //     iconRef.current.className = "absolute -z-10 right-0 ml-5 hidden";
  //   } else {
  //     return;
  //   }
  // };
  // const handleIconShow2 = () => {
  //   if (iconRef2.current.className === "absolute -z-10 right-0 ml-5 hidden") {
  //     iconRef2.current.className =
  //       "absolute -z-10 block right-0 ml-5  animate-pulse";
  //   }
  // };
  // const handleIconHide2 = () => {
  //   if (
  //     iconRef2.current.className ===
  //     "absolute -z-10 block right-0 ml-5  animate-pulse"
  //   ) {
  //     iconRef2.current.className = "absolute -z-10 right-0 ml-5 hidden";
  //   } else {
  //     return;
  //   }
  // };

  const searchNow = true;

  return (
    <>
      <Head>
        <title>Inicio | StarWars</title>
      </Head>

      <div className={styles.container}>
        <header>
          <div className=" pl-5 w-full flex flex-row items-center justify-between">
            <span className="font-bold text-2xl">STAR WARS</span>

            <div
              onClick={toggleSearching}
              className={
                searching
                  ? // ? styles.searchIcon
                    "flex flex-row bg-slate-900 p-5 cursor-pointer -translate-x-96 duration-300 transition ease-in-out"
                  : "flex flex-row bg-slate-900 p-5 cursor-pointer "
              }
            >
              <IoSearchSharp
                className="hover:fill-cyan-700 text-5xl"
                color="#fff"
              />
            </div>
          </div>
        </header>

        <audio
          className="invisible"
          ref={soundRef}
          controls
          preload="auto"
          id="sabber"
        >
          <source src="fx4.mp3" type="audio/mpeg" />
        </audio>
        <audio
          className="invisible"
          ref={soundRef2}
          controls
          preload="auto"
          id="sabber"
        >
          <source src="fx5.mp3" type="audio/mpeg" />
        </audio>
        {!searching ? (
          <div className=" container  flex flex-col w-8/12 items-center p-1">
            <div className="flex flex-col  w-8/12 items-start self-end justify-end  ">
              <span className=" font-bold text-5xl  w-full border-b-4">
                ESCOLHA
              </span>
              <span className=" font-bold text-5xl ">SABIAMENTE</span>
            </div>
            <div className="flex flex-row justify-between w-full pl-5 mt-28">
              <button
                onMouseEnter={handlePlaySound}
                // onMouseLeave={handleIconHide1}
                className="flex flex-row items-center justify-end bg-zinc-900 w-5/12 h-20 pr-5 hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Personagens
              </button>
              <button
                onMouseEnter={handlePlaySound2}
                // onMouseLeave={handleIconHide2}
                className="flex flex-row items-center justify-start bg-zinc-900 w-5/12 h-20 pl-5 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Planetas
              </button>
            </div>
          </div>
        ) : (
          <SearchField
            toggleSearching={toggleSearching}
            searching={searching}
          />
        )}
      </div>
    </>
  );
}

import React from "react";
import classes from "./index.module.css";
import Image from "next/image";
import Table from "../Table/index2";
type Props = {};

const Stats = (props: Props) => {
  return (
    <>
      <h1 className={classes.h1}>Leaderboard NFTs</h1>
      <div className={classes.buttons}>
        <button className={classes.button}>
          <Image alt="" src={"/List.png"} width={25.2} height={25.2} /> Category
        </button>
        <button className={classes.button}>
          <Image alt="" src={"/Voiceid.png"} width={25.2} height={25.2} />
          Collection
        </button>
        <button className={classes.button}>
          <Image alt="" src={"/Dollar.png"} width={25.2} height={25.2} /> Price
        </button>
      </div>
      <div className="">
        <Table></Table>
      </div>
    </>
  );
};

export default Stats;

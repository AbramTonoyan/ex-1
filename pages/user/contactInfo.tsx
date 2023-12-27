import React, { FC } from "react";
import Link from "next/link";
import classes from "./index.module.css";
type ContactInfoProps = {
  id: number;
  name: string;
  img: string;
  volume: number;
  hours: number;
  floor_price: number;
  owner: number;
  items: number;
};

const YourComponent: FC<ContactInfoProps> = ({
  id,
  name,
  img,
  floor_price,
  hours,
  items,
  owner,
  volume,
}) => (
  <Link
    className={classes.link}
    href={`/user/${id}?name=${name}&img=${img}&volume=${volume}&hours=${hours}&floor_price=${floor_price}&owner=${owner}&items=${items}`}
  >
    View Details
  </Link>
);

export default YourComponent;

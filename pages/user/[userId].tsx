// pages/user/[userId].js

import { useRouter } from "next/router";
import classes from "./index.module.css";

const UserPage = () => {
  const router = useRouter();
  const { userId, name, volume, hours, img, floor_price, owner, items } =
    router.query;

  return (
    <div className={classes.user}>
      <h1>User ID: {userId}</h1>
      <h1>User name: {name}</h1>
      <h1>User volume: {volume}</h1>
      <h1>User hours: {hours}</h1>
      <h1>User img: {img}</h1>
      <h1>User floor price: {floor_price}</h1>
      <h1>User owner: {owner}</h1>
      <h1>User items: {items}</h1>
    </div>
  );
};

export default UserPage;

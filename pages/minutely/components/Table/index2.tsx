import React, { useState, useEffect, useCallback, FC } from "react";
import classes from "./index.module.css";
import Image from "next/image";
import ContactInfo from "../../../user/contactInfo";

interface User {
  id: number;
  name: string;
  img: string;
  volume: number;
  hours: number;
  floor_price: number;
  owner: number;
  items: number;
}
const Table: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("image1");
  const [newVolume, setNewVolume] = useState<number>();
  const [newHours, setNewHours] = useState<number>();
  const [newFloor_price, setNewFloor_price] = useState<number>();
  const [newOwner, setNewOwner] = useState<number>();
  const [newItems, setNewItems] = useState<number>(100);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
  }, [users]);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: newUserName,
      img: newImg,
      volume: newVolume,
      hours: newHours,
      floor_price: newFloor_price,
      owner: newOwner,
      items: newItems,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setNewUserName("");
    setNewImg("image1");
    setNewVolume(1000);
    setNewHours(1);
    setNewFloor_price(2.1);
    setNewOwner(2.2);
    setNewItems(100);
  };

  const handleDeleteAllUsers = () => {
    setUsers([]);
  };
  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSort = (field: keyof User) => {
    setUsers((prevUsers) => {
      const sortedUsers = [...prevUsers].sort((a, b) =>
        a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
      );
      return sortedUsers;
    });
  };

  const handleEdit = (userId: number) => {
    const userToEdit = users.find((user) => user.id === userId);

    if (userToEdit) {
      setEditingUserId(userId);
      setNewUserName(userToEdit.name);
      setNewVolume(userToEdit.volume);
      setNewHours(userToEdit.hours);
      setNewFloor_price(userToEdit.floor_price);
      setNewOwner(userToEdit.owner);
      setNewItems(userToEdit.items);
    }
  };

  const handleSaveEdit = () => {
    if (editingUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: newUserName,
              volume: newVolume,
              hours: newHours,
              floor_price: newFloor_price,
              owner: newOwner,
              items: newItems,
            }
          : user
      );

      setUsers(updatedUsers);
      setEditingUserId(null);
      setNewUserName("");
      setNewImg("");
      setNewVolume(0);
      setNewHours(0);
      setNewFloor_price(0);
      setNewOwner(0);
      setNewItems(100);
    }
  };

  return (
    <>
      <div className={classes.modal}>
        <form className={classes.modalUser}>
          <div className={classes.inputes}>
            <div>
              <label>
                Name:
                <input
                  className={classes.input}
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Image:
                <select
                  className={classes.input}
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                >
                  <option value="image1">Image 1</option>
                  <option value="image2">Image 2</option>
                  <option value="image4">Image 4</option>
                  <option value="image5">Image 5</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Volume:
                <input
                  min={1000}
                  max={9999}
                  className={classes.input}
                  type="number"
                  value={newVolume}
                  onChange={(e) => setNewVolume(Number(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Hours:
                <input
                  className={classes.input}
                  type="number"
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Floor Price:
                <input
                  min={2.1}
                  max={3.5}
                  className={classes.input}
                  type="number"
                  value={newFloor_price}
                  onChange={(e) => setNewFloor_price(Number(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Owner:
                <input
                  min={2.2}
                  max={2.2}
                  className={classes.input}
                  type="number"
                  value={newOwner}
                  onChange={(e) => setNewOwner(Number(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Items:
                <select
                  className={classes.input}
                  value={newItems}
                  onChange={(e) => setNewItems(Number(e.target.value))}
                >
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                </select>
              </label>
            </div>
          </div>
          <div className={classes.buttons}>
            <button className={classes.button} onClick={handleAddUser}>
              Add New Users
            </button>
            <br />
            <button className={classes.button} onClick={handleDeleteAllUsers}>
              Delete all Users
            </button>

            <button onClick={handleSaveEdit} className={classes.button}>
              Save
            </button>
          </div>
        </form>
      </div>
      <div className={classes.excel}>
        <h2 className={classes.h2}>Users</h2>
        <div className={classes.div_1}>
          <p className={classes.margin_right}>Collection</p>
          <button onClick={() => handleSort("volume")}>Volume</button>
          <button onClick={() => handleSort("hours")}>24h %</button>
          <button onClick={() => handleSort("floor_price")}>Floor Price</button>
          <button onClick={() => handleSort("owner")}>Owners</button>
          <button onClick={() => handleSort("items")}>Items</button>
        </div>
      </div>
      <ul className={classes.ul}>
        {users.map((user, index) => (
          <li key={index} className={classes.row_1}>
            <div
              className={classes.row_img}
              style={{ gridArea: `1 / 1 / 2 / 2` }}
            >
              <Image
                className={classes.image}
                alt=""
                src={`${user?.img}.svg`}
                width={100}
                height={100}
              />
              <div className={classes.img_name}>
                <strong className={classes.name}>{user.name}</strong>
                <p className={classes.surname}>{user.name}</p>
              </div>
            </div>
            <div
              className={classes.volume}
              style={{ gridArea: `1 / 2 / 2 / 3` }}
            >
              {" "}
              <Image
                alt=""
                src={`mdi_ethereum.svg`}
                width={31.5}
                height={31.5}
              />
              {user.volume}
            </div>
            <div
              className={classes.hours}
              style={{ gridArea: `1 / 3 / 2 / 4` }}
            >
              {user.hours}
            </div>
            <div
              style={{ gridArea: `1 / 4 / 2 / 5` }}
              className={classes.floor_priec}
            >
              <Image
                alt=""
                src={`mdi_ethereum.svg`}
                width={31.5}
                height={31.5}
              />
              {user.floor_price}
            </div>
            <div
              style={{ gridArea: `1 / 5 / 2 / 6` }}
              className={classes.owners}
            >
              {user.owner}
            </div>
            <div
              style={{ gridArea: ` 1 / 6 / 2 / 7 ` }}
              className={classes.items}
            >
              {user.items}
            </div>

            <div>
              <button
                className={classes.button}
                style={{ gridArea: ` 1 / 7 / 2 / 8` }}
                onClick={() => handleEdit(user.id)}
              >
                Edit
              </button>
            </div>
            <button
              className={classes.button}
              style={{ gridArea: ` 1 / 8 / 2 / 9` }}
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
            {console.log(user)}
            <button className={classes.button}>
              <ContactInfo
                id={user.id}
                name={user.name}
                img={user.img}
                volume={user.volume}
                hours={user.hours}
                floor_price={user.floor_price}
                owner={user.owner}
                items={user.items}
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Table;

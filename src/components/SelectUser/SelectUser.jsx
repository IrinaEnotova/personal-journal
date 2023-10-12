import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import styles from "./SelectUser.module.css";

const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (event) => {
    setUserId(Number(event.target.value));
  };

  return (
    <>
      <select className={styles["select"]} name="user" id="user" value={userId} onChange={changeUser}>
        <option value="1">User1</option>
        <option value="2">User2</option>
      </select>
    </>
  );
};

export default SelectUser;

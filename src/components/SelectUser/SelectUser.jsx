import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SelectUser = () => {
  // вытащим из контекста значение и функцию-сеттер
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (event) => {
    // а здесь при изменении значения будем менять состояние
    setUserId(Number(event.target.value));
  };

  return (
    <>
      <select name="user" id="user" value={userId} onChange={changeUser}>
        <option value="1">Ira</option>
        <option value="2">George</option>
      </select>
    </>
  );
};

export default SelectUser;

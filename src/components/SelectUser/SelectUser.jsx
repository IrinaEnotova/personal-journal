const SelectUser = () => {
  const changeUser = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <select name="user" id="user" onChange={changeUser}>
        <option value="1">Ira</option>
        <option value="2">George</option>
      </select>
    </>
  );
};

export default SelectUser;

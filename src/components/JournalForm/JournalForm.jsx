import { useState } from "react";
import Button from "../Button/Button";
import "./JournalForm.css";

const JournalForm = ({ addItem }) => {
  const [inputData, setInputData] = useState("");

  const inputChange = (event) => {
    setInputData(event.target.value);
  };

  const addJournalItem = (event) => {
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    addItem(formProps);
    event.preventDefault();
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" required />
      <input type="date" name="date" required />
      <input type="text" value={inputData} onChange={inputChange} name="tag" required />
      <textarea name="text" id="" cols="30" rows="10" required></textarea>
      <Button text="Save"></Button>
    </form>
  );
};

export default JournalForm;

import classNames from "classnames";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";

const JournalForm = ({ addItem }) => {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });
  const [inputData, setInputData] = useState("");

  const inputChange = (event) => {
    setInputData(event.target.value);
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    // добавим проверку для всех инпутов
    let isFormValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    // подведем итог по валидации
    if (!isFormValid) {
      return;
    }
    addItem(formProps);
  };

  return (
    <form className={`${styles["journal-form"]}`} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={classNames(styles["input-title"], { [styles.invalid]: !formValidState.title })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-labels"]}>
          <img src="/date.svg" alt="Date icon" />
          <span>Date</span>
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className={classNames(styles.input, { [styles.invalid]: !formValidState.date })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-labels"]}>
          <img src="/tag.svg" alt="Tag icon" />
          <span>Tags</span>
        </label>
        <input id="tag" type="text" value={inputData} onChange={inputChange} name="tag" className={styles.input} />
      </div>
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        className={classNames(styles.input, { [styles.invalid]: !formValidState.text })}
      ></textarea>
      <Button text="Save"></Button>
    </form>
  );
};

export default JournalForm;

import classNames from "classnames";
import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import { INITIAL_STATE, formReducer } from "./JournalFormState";
import Input from "../Input/Input";
import styles from "./JournalForm.module.css";
import { UserContext } from "../../context/userContext";

const JournalForm = ({ addItem, data, onDelete }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
    console.log(data);
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || isValid.title || !isValid.text) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }

    return function () {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      addItem({ ...values, userId });
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId: userId } });
    }
  }, [isFormReadyToSubmit, values, addItem, userId]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId: userId } });
  }, [userId]);

  const onChange = (event) => {
    dispatchForm({ type: "SET_VALUE", payload: { [event.target.name]: event.target.value } });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    dispatchForm({ type: "SUBMIT", payload: formProps });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId: userId } });
  };

  return (
    <form className={`${styles["journal-form"]}`} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <Input
          type="text"
          name="title"
          ref={titleRef}
          value={values.title}
          onChange={onChange}
          appearance="title"
          isValid={isValid.title}
        />
        {data.id && (
          <button className={styles["delete"]} type="button" onClick={() => deleteJournalItem()}>
            <img src="/archive.svg" alt="Delete" />
          </button>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-labels"]}>
          <img src="/date.svg" alt="Date icon" />
          <span>Date</span>
        </label>
        <Input
          id="date"
          type="date"
          ref={dateRef}
          name="date"
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ""}
          onChange={onChange}
          isValid={isValid.date}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-labels"]}>
          <img src="/tag.svg" alt="Tag icon" />
          <span>Tags</span>
        </label>
        <Input id="tag" type="text" name="tag" value={values.tag} onChange={onChange} />
      </div>
      <textarea
        name="text"
        ref={textRef}
        value={values.text}
        onChange={onChange}
        cols="30"
        rows="10"
        className={classNames(styles.input, { [styles.invalid]: !isValid.text })}
      ></textarea>
      <Button>Save</Button>
    </form>
  );
};

export default JournalForm;

import classNames from "classnames";
import { useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import { INITIAL_STATE, formReducer } from "./JournalFormState";
import Input from "../Input/Input";
import styles from "./JournalForm.module.css";
import { UserContext } from "../../context/userContext";

const JournalForm = ({ addItem }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

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
    let timerId;
    if (!isValid.date || isValid.title || !isValid.text) {
      // для фокусировки на референсе
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
      addItem(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, addItem]);

  const onChange = (event) => {
    dispatchForm({ type: "SET_VALUE", payload: { [event.target.name]: event.target.value } });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    dispatchForm({ type: "SUBMIT", payload: formProps });
  };

  return (
    <UserContext.Consumer>
      {(context) => (
        <form className={`${styles["journal-form"]}`} onSubmit={addJournalItem}>
          {context.userId}
          <div>
            <Input
              type="text"
              name="title"
              ref={titleRef}
              value={values.title}
              onChange={onChange}
              appearance="title"
              isValid={isValid.title}
            />
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
              value={values.date}
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
          <Button text="Save"></Button>
        </form>
      )}
    </UserContext.Consumer>
  );
};

export default JournalForm;

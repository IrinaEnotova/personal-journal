import classNames from "classnames";
import { useEffect, useReducer } from "react";
import Button from "../Button/Button";
import { INITIAL_STATE, formReducer } from "./JournalFormState";
import styles from "./JournalForm.module.css";

const JournalForm = ({ addItem }) => {
  // удалим useState и свяжем содержимое с валидацией через useReducer
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  // можно деструктурировать наш formState, чтобы каждую зависимость можно было использовать в нужном месте
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || isValid.title || !isValid.text) {
      timerId = setTimeout(() => {
        // заменим на useReducer
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }

    // для очистки таймаута\интервала
    return function () {
      clearTimeout(timerId);
    };
    // здесь используем зависимость не от всего состояния, а только от того, валидна ли форма
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      addItem(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, addItem]);

  // здесь используется динамическая переменная, чтобы функция была универсальна для всех инпутов
  const onChange = (event) => {
    dispatchForm({ type: "SET_VALUE", payload: { [event.target.name]: event.target.value } });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    // проверку на валидность перед сабмитом перенесем в reducer
    dispatchForm({ type: "SUBMIT", payload: formProps });
    // а функцию по добавлению перенесем в useEffect, который будет зависеть от флага isFormReadyToSubmit
  };

  return (
    <form className={`${styles["journal-form"]}`} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
          className={classNames(styles["input-title"], { [styles.invalid]: !isValid.title })}
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
          value={values.date}
          onChange={onChange}
          className={classNames(styles.input, { [styles.invalid]: !isValid.date })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-labels"]}>
          <img src="/tag.svg" alt="Tag icon" />
          <span>Tags</span>
        </label>
        <input id="tag" type="text" name="tag" value={values.tag} onChange={onChange} className={styles.input} />
      </div>
      <textarea
        name="text"
        value={values.text}
        onChange={onChange}
        cols="30"
        rows="10"
        className={classNames(styles.input, { [styles.invalid]: !isValid.text })}
      ></textarea>
      <Button text="Save"></Button>
    </form>
  );
};

export default JournalForm;

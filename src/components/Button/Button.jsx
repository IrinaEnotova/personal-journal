import classNames from "classnames";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button className={classNames(styles.button, styles.accent)} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

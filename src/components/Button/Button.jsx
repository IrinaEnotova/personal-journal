import classNames from "classnames";
import styles from "./Button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <button className={classNames(styles.button, styles.accent)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

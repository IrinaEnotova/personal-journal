import { useState } from "react";
import "./Button.css";

const Button = () => {
  console.log("rerender"); // если мы выведем эту фразу - она выведется 2 раза
  const [text, setText] = useState("Save");
  const clicked = () => {
    setText((t) => t + "!");
    console.log(text);
  };
  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
};

export default Button;

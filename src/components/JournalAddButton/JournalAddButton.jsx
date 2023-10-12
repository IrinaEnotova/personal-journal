import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

const JournalAddButton = ({ clearForm }) => {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <img src="/plus.svg" alt="+" />
      New memory
    </CardButton>
  );
};

export default JournalAddButton;

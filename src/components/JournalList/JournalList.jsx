import { useContext } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";
import { UserContext } from "../../context/userContext";

const JournalList = ({ data }) => {
  const { userId } = useContext(UserContext);

  if (data.length === 0) {
    return <p>Add your first memory</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  return (
    <>
      {data
        .filter((el) => el.userId === userId)
        .sort(sortItems)
        .map((dataItem) => (
          <CardButton key={dataItem.id}>
            <JournalItem title={dataItem.title} text={dataItem.text} date={dataItem.date} />
          </CardButton>
        ))}
    </>
  );
};

export default JournalList;

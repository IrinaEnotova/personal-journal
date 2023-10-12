import { useContext, useMemo } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { UserContext } from "../../context/userContext";
import "./JournalList.css";

const JournalList = ({ data, setItem }) => {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  // вынесем из JSX логику по фильтрации и сортировке
  const filteredData = useMemo(() => data.filter((el) => el.userId === userId).sort(sortItems), [data, userId]);

  if (data.length === 0) {
    return <p>Add your first memory</p>;
  }

  return (
    <>
      {filteredData.map((dataItem) => (
        <CardButton key={dataItem.id} onClick={() => setItem(dataItem)}>
          <JournalItem title={dataItem.title} text={dataItem.text} date={dataItem.date} />
        </CardButton>
      ))}
    </>
  );
};

export default JournalList;

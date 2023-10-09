import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";

const JournalList = ({ data }) => {
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
      {data.sort(sortItems).map((dataItem) => (
        <CardButton key={dataItem.id}>
          <JournalItem title={dataItem.title} text={dataItem.text} date={dataItem.date} />
        </CardButton>
      ))}
    </>
  );
};

export default JournalList;

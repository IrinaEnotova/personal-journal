import "./App.css";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function App() {
  const data = [
    {
      title: "Preparation for courses' update",
      date: new Date(),
      text: "The first version of text for Journal Item",
    },
    { title: "Hiking in the mountains", date: new Date(), text: "The second item for Journal Item" },
  ];
  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {data.map((dataItem) => (
            <CardButton key={dataItem.date + 1}>
              <JournalItem key={dataItem.date} title={dataItem.title} text={dataItem.text} date={dataItem.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>Body</Body>
    </div>
  );
}

export default App;

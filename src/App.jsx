import "./App.css";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useState } from "react";

const INITIAL_DATA = [
  {
    id: 1,
    title: "Preparation for courses' update",
    date: new Date(),
    text: "The first version of text for Journal Item",
  },
  { id: 2, title: "Hiking in the mountains", date: new Date(), text: "The second item for Journal Item" },
];

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setData((oldData) => [
      ...oldData,
      {
        // увеличим предыдущий id на единицу
        id: Math.max(...oldData.map((el) => el.id)) + 1,
        title: item.title,
        date: new Date(item.date),
        text: item.text,
        tag: item.tag,
      },
    ]);
  };

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {data.sort(sortItems).map((dataItem) => (
            <CardButton key={dataItem.id}>
              <JournalItem title={dataItem.title} text={dataItem.text} date={dataItem.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm addItem={addItem} />
      </Body>
    </div>
  );
}

export default App;

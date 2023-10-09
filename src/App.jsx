import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("data"));
    if (items) {
      setData(items.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const addItem = (item) => {
    setData((oldData) => [
      ...oldData,
      {
        id: oldData.length !== 0 ? Math.max(...oldData.map((el) => el.id)) + 1 : 1,
        title: item.title,
        date: new Date(item.date),
        text: item.text,
        tag: item.tag,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList data={data} />
      </LeftPanel>
      <Body>
        <JournalForm addItem={addItem} />
      </Body>
    </div>
  );
}

export default App;

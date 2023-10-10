import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { UserContext } from "./context/userContext";

function mapItems(data) {
  if (!data) return [];
  return data.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [data, setData] = useLocalStorage("data");

  const addItem = (item) => {
    setData([
      ...mapItems(data),
      {
        id: data.length !== 0 ? Math.max(...data.map((el) => el.id)) + 1 : 1,
        title: item.title,
        date: new Date(item.date),
        text: item.text,
        tag: item.tag,
      },
    ]);
  };

  return (
    // в провайдере в value мы ДОЛЖНЫ установить дефолтные значения
    <UserContext.Provider value={{ userId: 1 }}>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList data={mapItems(data)} />
        </LeftPanel>
        <Body>
          <JournalForm addItem={addItem} />
        </Body>
      </div>
    </UserContext.Provider>
  );
}

export default App;

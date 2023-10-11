import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { UserContextProvider } from "./context/userContext";

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
        ...item,
        date: new Date(item.date),
        id: data.length !== 0 ? Math.max(...data.map((el) => el.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <UserContextProvider>
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
    </UserContextProvider>
  );
}

export default App;

import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { UserContextProvider } from "./context/userContext";
import { useState } from "react";

function mapItems(data) {
  if (!data) return [];
  return data.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [data, setData] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setData([
        ...mapItems(data),
        {
          ...item,
          date: new Date(item.date),
          id: data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setData([
        ...mapItems(data).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setData([...data.filter((i) => i.id !== id)]);
  };

  const clearForm = () => {
    setSelectedItem(null);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={clearForm} />
          <JournalList data={mapItems(data)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm addItem={addItem} data={selectedItem} onDelete={deleteItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;

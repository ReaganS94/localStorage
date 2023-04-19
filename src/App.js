import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); // State variable to store user input value
  const [notInStorage, setNotInStorage] = useState([]); // State variable to store texts not in local storage
  const [storageText, setStorageText] = useState([]); // State variable to store texts from local storage
  const [allTexts, setAllTexts] = useState([]); // State variable to store all texts
  const [hasItemsToSave, setHasItemsToSave] = useState(false); // State variable to track if there are items to save in local storage

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotInStorage((prev) => [...prev, input]); // Add input value to notInStorage state
    setAllTexts((prev) => [...prev, input]); // Add input value to allTexts state
    setInput(""); // Reset input value
  };

  const saveToStorage = () => {
    if (!notInStorage.length) {
      alert("HEY, type something first");
    }
    setHasItemsToSave(true); // Set hasItemsToSave state to true to trigger saving to local storage
  };

  // Loading text from local storage when the component mounts
  useEffect(() => {
    const storedText = localStorage.getItem("texts");
    if (storedText) {
      setStorageText(JSON.parse(storedText)); // Parse and set storedText to storageText state
      setAllTexts(JSON.parse(storedText)); // Parse and set storedText to allTexts state
    }
  }, []);

  // Saving texts to local storage when hasItemsToSave state changes
  useEffect(() => {
    if (hasItemsToSave) {
      const mergedStorage = [...storageText, ...notInStorage]; // Merge texts from storageText and notInStorage
      localStorage.setItem("texts", JSON.stringify(mergedStorage)); // Save mergedStorage to local storage
      setNotInStorage([]); // Reset notInStorage state
      setHasItemsToSave(false); // Reset hasItemsToSave state
      setStorageText(mergedStorage); // Update storageText state
    }
  }, [hasItemsToSave, notInStorage, storageText]);

  const clearAll = () => {
    localStorage.removeItem("texts"); // Remove texts from local storage
    setHasItemsToSave(false); // Reset hasItemsToSave state
    setAllTexts([]); // Reset allTexts state
    setStorageText([]); // Reset storageText state
  };

  return (
    <div className="App">
      <h1>Local Storage Workshop</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <button onClick={saveToStorage}>Save to storage</button>
      <button onClick={clearAll}>Clear all</button>

      {/* Render stored texts if hasItemsToSave is true, otherwise render all texts */}
      {hasItemsToSave
        ? storageText.map((text) => <h3>{text}</h3>)
        : allTexts.map((text) => <h3>{text}</h3>)}
    </div>
  );
}

export default App;

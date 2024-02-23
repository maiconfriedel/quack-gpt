import { ipcRenderer } from "electron";
import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    ipcRenderer.send("handle-submit", input);
    setInput("");
  }

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          className="input"
          type="text"
          placeholder="Ask to Chat GPT 🦆"
          spellCheck="false"
          autoFocus
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
        />
      </form>
    </>
  );
}

export default App;

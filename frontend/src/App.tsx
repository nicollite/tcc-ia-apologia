import React, { useState } from "react";
import "./App.css";
import { api } from "./services/api";

function App() {
  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [payload, setPayload] = useState([]);

  const requestApi = async () => {
    if (text.length === 0) return;
    setSpinner(true);
    const res = await api.post("", { text });
    setSpinner(false);
    setPayload(res.data.payload);
  };

  const result = payload.map(data => {
    const result = `${(parseFloat(data.classification.score) * 100).toFixed(2)}%`;
    console.log(result);

    return (
      <div>
        <span>
          {data.displayName}: {result}
        </span>
        <div className="result-bars bg-gray-div">
          <div className="result-bars classification-result-div" style={{ width: result }}></div>
        </div>
      </div>
    );
  });

  const spinnedElement = <div className="loader">Consultando...</div>;

  return (
    <div className="bg">
      <div className="main">
        <label htmlFor="text">Insira o texto para ser analisado abaixo:</label>
        <textarea id="text" onChange={e => setText(e.target.value)} />
        <button className="btn" onClick={requestApi}>
          {"Enviar >"}
        </button>
        <div className="result">
          <span>Resultados:</span>
          {spinner ? spinnedElement : result}
        </div>
      </div>
    </div>
  );
}

export default App;

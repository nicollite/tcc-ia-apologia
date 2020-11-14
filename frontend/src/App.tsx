import React, { useState } from 'react';
import './App.css';
import { api } from "./services/api";

function App() {
  const [text, setText] = useState("")
  const [payload, setPayload] = useState([])

  const requestApi = async () => {
    console.log(text)
    const res = await api.post("", { text })
    setPayload(res.data.payload)
    console.log(res)
  }

  const result = payload.map((data, index) => (
    <span>{data.displayName}: {(parseFloat(data.classification.score) * 100).toFixed(2)} %</span>
  ))

  return (
    <div className="bg">
      <div className="main">
        <label htmlFor="text">Insira o texto para ser analisado abaixo:</label>
        <textarea id="text" onChange={(e) => setText(e.target.value)} />
        <button className="btn" onClick={requestApi}>{"Enviar >"}</button>
        <div className="result">
          <span>Resultados:</span>
          {result}
        </div>
      </div>
    </div>
  );
}

export default App;

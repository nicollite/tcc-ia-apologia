import React, { useState, BaseSyntheticEvent } from "react";
import Loader from "react-loader-spinner";
import "./App.css";
import { api } from "./services/api";

function App() {
  const maxTextLength = 60000;

  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [payload, setPayload] = useState([]);

  function textHandler(e: BaseSyntheticEvent) {
    const textArea = e.target as HTMLTextAreaElement;
    const value = textArea.value.slice(0, maxTextLength);

    if (textArea.value.length > maxTextLength) textArea.value = value;
    setText(value);
  }

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

  const spinnedElement = (
    <div className="loader-div">
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  );

  return (
    <div className="bg">
      <div className="main">
        <h1>Απολογία (Apologia) - ia para análise doutrinária</h1>
        <label htmlFor="text">
          <span>
            Insira o texto abaixo para ser analisado de acordo com a doutrina da{" "}
            <span className="bold">Trindade</span>*:
          </span>
          <span className="litle-text">
            *textos não relacionados a doutrina ainda que bíblicos os resultados não serão precisos.
          </span>
        </label>

        <textarea id="text" onChange={textHandler} />
        <span className="litle-text align-end">
          {text.length}/{maxTextLength}
        </span>

        <button className="btn align-end" onClick={requestApi}>
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

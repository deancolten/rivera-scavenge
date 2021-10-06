import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { pageArray } from "./pages";

function App() {
  const refNum = useRef(0);
  const [pageNum, setPageNum] = useState(refNum.current);
  const [canProceed, setCanProceed] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [inputField, setInputField] = useState("");

  //On Mount
  useEffect(() => {
    const startingValue =
      Number(localStorage.getItem("page")) >= 0
        ? Number(localStorage.getItem("page"))
        : 0;
    refNum.current = startingValue;
    setPageNum(refNum.current);
  }, []);

  //On Page Turn
  useEffect(() => {
    setCanProceed(!pageArray[pageNum].input);
    setInputField("");
    setShowTip(false);
  }, [pageNum]);

  const nextPage = useCallback(() => {
    localStorage.setItem("page", refNum.current + 1);
    refNum.current += 1;
    setPageNum((currentPage) => currentPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    localStorage.setItem("page", refNum.current - 1);
    refNum.current -= 1;
    setPageNum((currentPage) => currentPage - 1);
  }, []);

  const checkInput = useCallback(
    (e) => {
      setInputField(e.target.value);
      if (e.target.value.toLowerCase() === pageArray[pageNum].input) {
        setCanProceed(true);
      }
    },
    [pageNum]
  );

  return (
    <div className="App Quest">
      <h2>{pageArray[pageNum].title}</h2>

      <p className="QBody">{pageArray[pageNum].body}</p>

      <p>
        <span hidden={!showTip}>{pageArray[pageNum].tip}</span>

        <p
          className="hint-btn"
          hidden={!pageArray[pageNum].tip}
          onClick={() => {
            setShowTip((currentTipState) => !currentTipState);
          }}
        >
          {showTip ? "Hide Hint" : "Need Help?"}
        </p>
      </p>

      <img
        src={pageArray[pageNum].image}
        className="photo"
        hidden={!pageArray[pageNum].image}
        alt={"Thing"}
      />

      <input
        className="inputField"
        hidden={!pageArray[pageNum].input}
        onChange={checkInput}
        value={inputField}
      />
      <div className="btnbox">
        <button hidden={pageNum === 0} onClick={prevPage} className="btn">
          Go Back
        </button>

        <button
          hidden={pageNum === pageArray.length - 1}
          disabled={!canProceed}
          onClick={nextPage}
          className="btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;

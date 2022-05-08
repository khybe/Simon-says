import { useState, useEffect } from "react";

import ColorCard from "./components/ColorCard";
import timeout from "../src/utils/utils";
import "./App.scss";

function App() {
  const [isOn, setIsOn] = useState(false);
  console.log(isOn);
  const colorList = ["green", "red", "blue", "yellow"];

  const initPlay = {
    isDisplay: false,
    displayColors: [],
    scores: 0,
    userColors: [],
    userPlay: false,
  };

  const [play, setPlay] = useState(initPlay);
  console.log(play);

  const [flashColor, setFlashColor] = useState("");

  const startHandler = () => {
    setIsOn(true);
  };

  useEffect(() => {
    if (isOn) {
      console.log("Game is started");
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      console.log(newColor);

      const copyColors = [...play.displayColors];
      copyColors.push(newColor);
      setPlay({ ...play, displayColors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.displayColors.length) {
      displayColorsHandler();
    }
  }, [isOn, play.isDisplay, play.displayColors.length]);

  const displayColorsHandler = async (color) => {
    await timeout(1000);

    for (let i = 0; i < play.displayColors.length; i++) {
      if (i === play.displayColors.length - 1) {
        setFlashColor(play.displayColors[i]);
        await timeout(500);
        setFlashColor("");
        await timeout(500);

        const copyColors = [...play.displayColors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          // Reverse elements of userColors.
          userColors: copyColors.reverse(),
        });
      }
    }
  };

  // Something is wrong with this function !
  const cardClickHandler = async (color) => {
    console.log(color);

    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(500);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            scores: play.displayColors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(500);
        setPlay({ ...initPlay, scores: play.displayColors.length });
      }
      await timeout(500);
      setFlashColor("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="cardWrapper">
          {colorList &&
            colorList.map((v, i) => (
              <ColorCard
                key={colorList[i]}
                color={v}
                flash={flashColor === v}
                onClick={() => cardClickHandler(v)}
              ></ColorCard>
            ))}
        </div>
        {!isOn && !play.score && (
          <button className="startButton" onClick={startHandler}>
            Start
          </button>
        )}
        {isOn && (play.isDisplay || play.userPlay) && (
          <div className="score">{play.scores}</div>
        )}
      </header>
    </div>
  );
}

export default App;

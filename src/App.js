import { useState, useEffect } from "react";
import useSound from "use-sound";

import greenSound from "../src/sounds/green.mp3";
import redSound from "../src/sounds/red.mp3";
import blueSound from "../src/sounds/blue.mp3";
import yellowSound from "../src/sounds/yellow.mp3";
import wrongSound from "../src/sounds/wrong.mp3";

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

  const [playGreenSound] = useSound(greenSound);
  const [playRedSound] = useSound(redSound);
  const [playBlueSound] = useSound(blueSound);
  const [playYellowSound] = useSound(yellowSound);
  const [playWrongSound] = useSound(wrongSound);

  const [playSound, setPlaySound] = useState(null);

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

      const soundOnDisplayColor = async () => {
        switch (newColor) {
          case "green":
            await timeout(1000);
            setPlaySound(playGreenSound());
            break;
          case "red":
            await timeout(1000);
            setPlaySound(playRedSound());
            break;
          case "blue":
            await timeout(1000);
            setPlaySound(playBlueSound());
            break;
          case "yellow":
            await timeout(1000);
            setPlaySound(playYellowSound());
            break;
          default:
            setPlaySound(null);
        }
      };

      soundOnDisplayColor();
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

    switch (color) {
      case "green":
        setPlaySound(playGreenSound());
        break;
      case "red":
        setPlaySound(playRedSound());
        break;
      case "blue":
        setPlaySound(playBlueSound());
        break;
      case "yellow":
        setPlaySound(playYellowSound());
        break;
      default:
        setPlaySound(null);
    }

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
        setPlaySound(playWrongSound());
      }
      await timeout(500);
      setFlashColor("");
    }
  };

  const closeHandler = () => {
    setIsOn(false);
  };

  return (
    <div className="App">
      <header className="bodyWrapper">
        <div className="header">
          <h1>Simon Says Game</h1>
          <p>How long a sequence can you remember?</p>
        </div>
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
        {isOn && !play.isDisplay && !play.userPlay && play.scores && (
          <div className="lost">
            <h2>Uh oh! You lost :(</h2>
            <p>Better luck next time :)</p>
            <p>Your score is: {play.scores}</p>
            <button onClick={closeHandler}>Close</button>
          </div>
        )}
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

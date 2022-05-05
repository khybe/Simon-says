import ColorCard from "./components/ColorCard";
import "./App.scss";

function App() {
  const colorList = ["green", "red", "blue", "yellow"];

  return (
    <div className="App">
      <header className="App-header">
        <div className="cardWrapper">
          {colorList &&
            colorList.map((v, i) => (
              <ColorCard key={colorList[i]} color={v}></ColorCard>
            ))}
        </div>
        <button className="button">Start</button>
      </header>
    </div>
  );
}

export default App;

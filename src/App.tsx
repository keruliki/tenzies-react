import { useState, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      alert("TENZIES!");
    } else {
      setTenzies(false);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function newGame(){
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? generateNewDie() : die;
      })
    );
    setTenzies(false);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      <main>
        <div>
          <h1 className="title">Yahtzee!</h1>
        </div>
        <div className="dice-container">{diceElements}</div>
        {!tenzies ? (
          <button className="roll-dice" onClick={rollDice}>
          Roll
        </button>) : (
          <button className="roll-dice" onClick={newGame}>
          New Game
        </button>
        )  
        }
        <div>
          <p>By keruliki</p>
        </div>
      </main>
    </>
  );
}

export default App;

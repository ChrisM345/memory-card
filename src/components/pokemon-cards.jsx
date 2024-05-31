import { useState } from "react";

function GeneratePokemonCards() {
  const [gameStart, setGameStart] = useState(false);
  const [cardData, setCardData] = useState([]);

  function handleStartGame() {
    console.log("starting");
    let pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
    console.log(pokemonIds);
    const selectedNumber = parseInt(document.getElementById("card-count").value);
    console.log(selectedNumber);
    let tempCardData = [];
    while (tempCardData.length != selectedNumber) {
      let pokemonId = Math.floor(Math.random() * pokemonIds.length);
      tempCardData.push(pokemonIds[pokemonId]);
      pokemonIds.splice(pokemonId, 1);
    }
    console.log(pokemonIds);
    console.log(tempCardData);
    setCardData(tempCardData);
    console.log(cardData);
    setGameStart(!gameStart);
  }

  function handleResetGame() {
    setGameStart(!gameStart);
  }

  return !gameStart ? (
    <>
      <div className="cardSelector">
        <h2>Choose how many cards to show</h2>
        <select id="card-count" name="card-count">
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onClick={handleStartGame}>Start</button>
      </div>
      <div className="card">
        <h2>Pokemon Name</h2>
      </div>
    </>
  ) : (
    <>
      <h2>Test</h2>
      <div className="card-container">
        {cardData.map((card) => {
          return (
            <>
              <div className="card">{card}</div>
            </>
          );
        })}
      </div>
      <button onClick={handleResetGame}>Reset</button>
    </>
  );
}

export default GeneratePokemonCards;

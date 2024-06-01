import { useState, useEffect } from "react";
import "../styles/cards.css";

function GeneratePokemonCards() {
  const [gameStart, setGameStart] = useState(false);
  const [cardData, setCardData] = useState();
  const [cardIds, setCardIds] = useState([]);

  function handleStartGame() {
    console.log("starting");
    let pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
    const selectedNumber = parseInt(document.getElementById("card-count").value);

    let copiedCardIds = [];
    for (let i = 0; i < selectedNumber; i++) {
      let pokemonId = Math.floor(Math.random() * pokemonIds.length);
      copiedCardIds.push(pokemonIds[pokemonId]);
      // setCardIds([...cardIds, pokemonIds[pokemonId]]);
      // console.log(pokemonIds[pokemonId]);
      pokemonIds.splice(pokemonId, 1);
    }

    setCardIds(copiedCardIds);
    console.log(cardIds);
    setGameStart(!gameStart);
  }

  useEffect(() => {
    const tempData = cardIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => [data.name, data.sprites.other["official-artwork"].front_default])
    );
    Promise.all(tempData).then((data) => setCardData(data));
  }, [cardIds]);

  console.log(cardData);

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
        {/* {cardData}
        {cardIds} */}
        {cardData.map((card) => {
          return (
            <>
              <div className="card">
                <img src={card[1]} />
                {card[0]}
              </div>
            </>
          );
        })}
      </div>
      <button onClick={handleResetGame}>Reset</button>
    </>
  );
}

export default GeneratePokemonCards;

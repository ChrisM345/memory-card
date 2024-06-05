import { useState, useEffect } from "react";
import "../styles/cards.css";
let playerCardChoices = [];
function GeneratePokemonCards() {
  const [gameStart, setGameStart] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [cardIds, setCardIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function handleStartGame() {
    let pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
    const selectedNumber = parseInt(document.getElementById("card-count").value);

    let copiedCardIds = [];
    for (let i = 0; i < selectedNumber; i++) {
      let pokemonId = Math.floor(Math.random() * pokemonIds.length);
      copiedCardIds.push(pokemonIds[pokemonId]);
      pokemonIds.splice(pokemonId, 1);
    }
    setCardIds(copiedCardIds);
  }

  useEffect(() => {
    const tempData = cardIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => [data.name, data.sprites.other["official-artwork"].front_default])
    );
    Promise.all(tempData)
      .then((data) => setCardData(data))
      .then(() => setGameStart(true));
  }, [cardIds]);

  // useEffect(() => {
  //   const tempCardData = cardData;
  //   for (let i = tempCardData.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = tempCardData[i];
  //     tempCardData[i] = tempCardData[j];
  //     tempCardData[j] = temp;
  //   }
  //   setCardData(tempCardData);
  // }, [score]);

  function handleResetGame() {
    setGameStart(!gameStart);
  }

  function randomizeCards() {
    const tempCardData = cardData;
    for (let i = tempCardData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tempCardData[i];
      tempCardData[i] = tempCardData[j];
      tempCardData[j] = temp;
    }
    setCardData(tempCardData);
  }
  function checkPlayerChoice(choice) {
    if (playerCardChoices.includes(choice)) {
      console.log("you picked this already");
      playerCardChoices.length = 0;
      setScore(0);
      randomizeCards();
    } else {
      playerCardChoices.push(choice);
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
      randomizeCards();
    }
    console.log(playerCardChoices);
  }

  function handleClick(cardName) {
    checkPlayerChoice(cardName);
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
    </>
  ) : (
    <>
      <h2>Test</h2>
      <div className="score">
        Score: {score}
        <br />
        Best Score: {bestScore}
      </div>
      <div className="card-container">
        {cardData.map((card) => {
          return (
            <>
              <div className="card" onClick={() => handleClick(card[0])}>
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

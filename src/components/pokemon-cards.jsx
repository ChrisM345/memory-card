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
    //Array with IDs for the original 151 Pokemon
    let pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
    //User chooses 6 to 10 cards to show
    const selectedNumber = parseInt(document.getElementById("card-count").value);

    let copiedCardIds = [];
    //Randomly pick Pokemon IDs and add them to copiedCardIDs. Once all are selected setCardIDs
    for (let i = 0; i < selectedNumber; i++) {
      let pokemonId = Math.floor(Math.random() * pokemonIds.length);
      copiedCardIds.push(pokemonIds[pokemonId]);
      pokemonIds.splice(pokemonId, 1);
    }
    setCardIds(copiedCardIds);
  }

  //Use the pokeapi to grab Pokemon images and names according to the ID
  useEffect(() => {
    const tempData = cardIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => [data.name, data.sprites.other["official-artwork"].front_default])
    );

    //Once we go through all the IDs we setCardData and start the game
    Promise.all(tempData)
      .then((data) => setCardData(data))
      .then(() => {
        if (gameStart == false && cardIds.length > 0) return setGameStart(true);
      });
  }, [cardIds]);

  function handleResetGame() {
    playerCardChoices.length = 0;
    setScore(0);
    setBestScore(0);
    setGameStart(!gameStart);
  }

  //Randomize card location on every click. setCardData to trigger display update
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

  //Check player choice by checking choice with elements in array
  function checkPlayerChoice(choice) {
    if (playerCardChoices.includes(choice)) {
      //Reset Game
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
      <div className="score">
        Score: {score}
        <br />
        Best Score: {bestScore}
      </div>
      <button className="reset" onClick={handleResetGame}>
        Reset
      </button>
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
    </>
  );
}

export default GeneratePokemonCards;
